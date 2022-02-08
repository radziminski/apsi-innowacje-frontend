import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DecisionDto, DecisionDtoIdeaStatusEnum, IdeaDto } from '~/api-client/java';
import apiClient from '~/api-client';
import { toast } from 'react-toastify';
import React from 'react';
import { FlexBox } from '~/components/Box';
import Loader from '~/components/Loader';

export interface IdeasState {
  ideasBySubject: Record<number & 'others', IdeaDto[]>;
  maxVotesBySubject: Record<number & 'others', number>;
  committeeMembersBySubject: Record<number & 'others', number[]>;
  isLoading: boolean;
  isSingleIdeaLoading: boolean;
  isDecisionOnIdeaLoading: boolean;
  decisionOnIdeaPendingToastIds: React.ReactText[];
}

const initialState: IdeasState = {
  ideasBySubject: {},
  maxVotesBySubject: {},
  committeeMembersBySubject: {},
  isLoading: false,
  isSingleIdeaLoading: false,
  isDecisionOnIdeaLoading: false,
  decisionOnIdeaPendingToastIds: []
};

const DecisionPendingMsg = () => {
  return (
    <FlexBox>
      <span>
        Trwa przetwarzanie... <Loader size={20} borderSize={2} />
      </span>
    </FlexBox>
  );
};

export const getIdeasBySubject = createAsyncThunk<
  { ideas: IdeaDto[] | null; maxVotes: number | null; committeeMembers: number[] | null },
  { subjectId: number | null; ideas: IdeaDto[] }
>('ideas/getBySubject', async ({ subjectId, ideas }) => {
  const [filteredIdeas, maxVotesResponse, committeeMembersResponse] = await Promise.all([
    Promise.resolve(ideas.filter(id => id.subjectId === subjectId)),
    subjectId === null ? Promise.resolve(null) : apiClient.getNumberOfAllowedVotesForSubjectUsingGET(subjectId),
    subjectId === null ? Promise.resolve(null) : apiClient.getCommitteeIdsBySubjectIdUsingGET(subjectId)
  ]);

  return {
    ideas: filteredIdeas,
    maxVotes: maxVotesResponse ? maxVotesResponse.data : null,
    committeeMembers: committeeMembersResponse ? committeeMembersResponse.data : null
  };
});

export const getSingleIdea = createAsyncThunk<IdeaDto | null, { ideaId: number; subjectId: number | 'others' }>(
  'ideas/getSingle',
  async ({ ideaId }) => {
    const response = await apiClient.getIdeaByIdUsingGET(ideaId);

    return response.status === 200 ? response.data : null;
  }
);

export const makeDecisionOnIdea = createAsyncThunk<
  { success: boolean; decision: DecisionDto },
  { ideaId: number; decision: DecisionDto }
>('ideas/makeDecision', async ({ ideaId, decision }) => {
  const response = await apiClient.addDecisionForIdeaUsingPUT(ideaId, decision);

  return { success: [200, 201].includes(response.status), decision };
});

export const makeDecisionOnIdeaAndGet = createAsyncThunk<
  void,
  { ideaId: number; subjectId: number | 'others'; decision: DecisionDto }
>('ideas/makeDecisionAndGet', async ({ ideaId, subjectId, decision }, { dispatch }) => {
  const result = await dispatch(makeDecisionOnIdea({ ideaId, decision }));
  if ((result.payload as { success: boolean; decision: DecisionDto }).success) {
    await dispatch(getSingleIdea({ ideaId, subjectId }));
  }
});

const createGetIdeasBySubjectReducers = (builder: ActionReducerMapBuilder<IdeasState>) => {
  builder.addCase(getIdeasBySubject.fulfilled, (state, action) => {
    // Do not use includes(null), as TS loses null-checking
    if (
      action.payload.ideas === null ||
      (action.meta.arg.subjectId !== null &&
        action.payload.maxVotes === null &&
        action.payload.committeeMembers === null)
    ) {
      toast.error('Wystąpił problem podczas pobierania pomysłów.');
    } else {
      // eslint-disable-next-line no-console
      console.log(action.payload.ideas);
      const key = action.meta.arg.subjectId === null ? 'others' : action.meta.arg.subjectId;
      state.ideasBySubject[key] = action.payload.ideas;
      state.maxVotesBySubject[key] = action.payload.maxVotes;
      state.committeeMembersBySubject[key] = action.payload.committeeMembers;
    }
    state.isLoading = false;
  });
  builder.addCase(getIdeasBySubject.pending, state => {
    state.isLoading = true;
  });
  builder.addCase(getIdeasBySubject.rejected, state => {
    state.isLoading = false;
    toast.error('Wystąpił problem podczas pobierania pomysłów.');
  });
};

const createGetSingleIdeaReducers = (builder: ActionReducerMapBuilder<IdeasState>) => {
  builder.addCase(getSingleIdea.fulfilled, (state, action) => {
    if (action.payload !== null) {
      state.ideasBySubject[action.meta.arg.subjectId] = state.ideasBySubject[action.meta.arg.subjectId].reduce(
        (all, idea) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          if (idea.id === action.payload!.id) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            all.push(action.payload!);
          } else {
            all.push(idea);
          }
          return all;
        },
        [] as IdeaDto[]
      );
    } else {
      toast.error('Wystąpił problem z pobraniem pomysłu.');
    }
  });
  builder.addCase(getSingleIdea.pending, state => {
    state.isSingleIdeaLoading = true;
  });
  builder.addCase(getSingleIdea.rejected, state => {
    state.isSingleIdeaLoading = false;
    toast.error('Wystąpił problem z pobraniem pomysłu.');
  });
};

const createMakeDecisionOnIdeaReducers = (builder: ActionReducerMapBuilder<IdeasState>) => {
  builder.addCase(makeDecisionOnIdea.fulfilled, (state, action) => {
    if (state.decisionOnIdeaPendingToastIds && state.decisionOnIdeaPendingToastIds.length) {
      toast.dismiss(state.decisionOnIdeaPendingToastIds.pop());
    }
    if (!action.payload.success) {
      toast.error('Wystąpił problem podczas przetwarzania decyzji.');
    } else {
      let textSuffix;
      switch (action.payload.decision.ideaStatus) {
        case DecisionDtoIdeaStatusEnum.Accepted:
          textSuffix = 'zaakceptowany';
          break;
        case DecisionDtoIdeaStatusEnum.Rejected:
          textSuffix = 'odrzucony';
          break;
        case DecisionDtoIdeaStatusEnum.PutAway:
          textSuffix = 'odłożony';
          break;
        case DecisionDtoIdeaStatusEnum.ReuqestForDetails:
          textSuffix = 'przekazany do uzupełnienia';
          break;
        default:
          'przetworzony';
      }

      toast.success(`Pomysł został ${textSuffix}.`);
    }
    state.isDecisionOnIdeaLoading = false;
  });
  builder.addCase(makeDecisionOnIdea.pending, state => {
    state.decisionOnIdeaPendingToastIds.push(
      toast.info(<DecisionPendingMsg />, {
        position: 'top-right',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    );
    state.isDecisionOnIdeaLoading = true;
  });
  builder.addCase(makeDecisionOnIdea.rejected, state => {
    state.isDecisionOnIdeaLoading = false;
    if (state.decisionOnIdeaPendingToastIds && state.decisionOnIdeaPendingToastIds.length) {
      toast.dismiss(state.decisionOnIdeaPendingToastIds.pop());
    }
    toast.error('Wystąpił problem podczas akceptacji pomysłu.', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  });
};

export const decisionsIdeasSlice = createSlice({
  name: 'decisionsIdeas',
  initialState,
  reducers: {},
  extraReducers: builder => {
    createGetIdeasBySubjectReducers(builder);
    createGetSingleIdeaReducers(builder);
    createMakeDecisionOnIdeaReducers(builder);
  }
});

export default decisionsIdeasSlice.reducer;
