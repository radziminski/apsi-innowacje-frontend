import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IdeaDto } from '~/api-client/java';
import apiClient from '~/api-client';
import { toast } from 'react-toastify';

export interface IdeasState {
  ideasBySubject: Record<number, IdeaDto[]>;
  maxVotesBySubject: Record<number, number>;
  committeeMembersBySubject: Record<number, number[]>;
  isLoading: boolean;
}

const initialState: IdeasState = {
  ideasBySubject: {},
  maxVotesBySubject: {},
  committeeMembersBySubject: {},
  isLoading: false
};

export const getIdeasBySubject = createAsyncThunk<
  { ideas: IdeaDto[] | null; maxVotes: number | null; committeeMembers: number[] | null; subjectId: number },
  number
>('ideas/getBySubject', async subjectId => {
  const [ideasResponse, maxVotesResponse, committeeMembersResponse] = await Promise.all([
    apiClient.getIdeasBySubjectIdUsingGET(subjectId),
    apiClient.getNumberOfAllowedVotesForSubjectUsingGET(subjectId),
    apiClient.getCommitteeIdsBySubjectIdUsingGET(subjectId)
  ]);

  return {
    ideas: ideasResponse.status === 200 ? ideasResponse.data : null,
    maxVotes: maxVotesResponse.status == 200 ? maxVotesResponse.data : null,
    committeeMembers: committeeMembersResponse.status == 200 ? committeeMembersResponse.data : null,
    subjectId
  };
});

const createGetIdeasBySubjectReducers = (builder: ActionReducerMapBuilder<IdeasState>) => {
  builder.addCase(getIdeasBySubject.fulfilled, (state, action) => {
    // Do not use includes(null), as TS loses null-checking
    if (action.payload.ideas === null || action.payload.maxVotes === null || action.payload.committeeMembers === null) {
      toast.error('Wystąpił problem podczas pobierania pomysłów.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } else {
      state.ideasBySubject[action.payload.subjectId] = action.payload.ideas;
      state.maxVotesBySubject[action.payload.subjectId] = action.payload.maxVotes;
      state.committeeMembersBySubject[action.payload.subjectId] = action.payload.committeeMembers;
    }
    state.isLoading = false;
  });
  builder.addCase(getIdeasBySubject.pending, state => {
    state.isLoading = true;
  });
  builder.addCase(getIdeasBySubject.rejected, state => {
    state.isLoading = false;
    toast.error('Wystąpił problem podczas pobierania pomysłów.', {
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
  }
});

export default decisionsIdeasSlice.reducer;
