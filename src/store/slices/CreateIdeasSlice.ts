import { ReviewDto, SubjectDto } from './../../api-client/java/api';
import { ActionReducerMapBuilder, createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import apiClient, { IdeaDto } from '~/api-client';
import { toast } from 'react-toastify';

export interface IdeasState {
  ideas: IdeaDto[] | null;
  isLoading: boolean;
  isError: boolean;
  error: SerializedError | null;
  isCreatingReview: boolean;
  isCreateReviewError: boolean;
  createdReviews: number[];
  isLoadingReviews: boolean;
  isReviewsError: boolean;
  reviews: Record<number, ReviewDto[]>;
  isDeleteError: boolean;
  isDeleting: boolean;
  deletedIdeas: number[];
  isBlockError: boolean;
  isBlocking: boolean;
  blockedIdeas: number[];
  isLoadingSubjects: boolean;
  isSubjectsError: boolean;
  subjects: SubjectDto[] | null;
  isLoadingVotes: boolean;
  isVotesError: boolean;
  subjectVotes: Record<number, number>;
}

const initialState: IdeasState = {
  ideas: null,
  isLoading: false,
  isError: false,
  error: null,
  isCreatingReview: false,
  isCreateReviewError: false,
  createdReviews: [],
  isLoadingReviews: false,
  isReviewsError: false,
  reviews: {},
  isDeleting: false,
  isDeleteError: false,
  deletedIdeas: [],
  isBlocking: false,
  isBlockError: false,
  blockedIdeas: [],
  isLoadingSubjects: false,
  isSubjectsError: false,
  subjects: null,
  isLoadingVotes: false,
  isVotesError: false,
  subjectVotes: {}
};

export const getIdeas = createAsyncThunk<IdeaDto[] | null, void>('ideas/getAll', async () => {
  const response = await apiClient.getAllIdeasUsingGET();
  return response.status === 200 ? response.data : null;
});

const createGetIdeasReducers = (builder: ActionReducerMapBuilder<IdeasState>) => {
  builder.addCase(getIdeas.fulfilled, (state, action) => {
    if (action.payload === null) {
      state.isError = true;
      state.error = null;
      toast.error('Wystąpił problem podczas pobierania pomysłów.');
    } else {
      state.ideas = [...action.payload];
      state.isError = false;
      state.error = null;
    }
    state.isLoading = false;
  });
  builder.addCase(getIdeas.pending, state => {
    state.isError = false;
    state.error = null;
    state.isLoading = true;
  });
  builder.addCase(getIdeas.rejected, (state, action) => {
    toast.error('Wystąpił problem podczas pobierania pomysłów.');
    state.isLoading = false;
    state.isError = true;
    state.error = action.error;
  });
};

export const reviewIdea = createAsyncThunk<number, { ideaId: number; rating: number; description?: string }>(
  'ideas/rate',
  async args => {
    const { ideaId, ...ratingDetails } = args;
    const response = await apiClient.saveReviewByIdeaIdUsingPOST(ideaId, ratingDetails);
    return response.data;
  }
);

const createReviewIdeaReducers = (builder: ActionReducerMapBuilder<IdeasState>) => {
  builder.addCase(reviewIdea.fulfilled, (state, action) => {
    state.isCreatingReview = false;
    state.isCreateReviewError = false;
    state.createdReviews = [...state.createdReviews, action.meta.arg.ideaId];
    if (state.ideas)
      state.ideas = state.ideas.map(idea => {
        if (idea.id === action.meta.arg.ideaId) {
          return {
            ...idea,
            alreadyReviewed: true
          };
        }

        return idea;
      });
  });
  builder.addCase(reviewIdea.pending, state => {
    state.isCreateReviewError = false;
    state.isCreatingReview = true;
  });
  builder.addCase(reviewIdea.rejected, state => {
    state.isCreatingReview = false;
    state.isCreateReviewError = true;
  });
};

export const getIdeaReviews = createAsyncThunk<ReviewDto[], number>('ideas/ratings', async args => {
  const response = await apiClient.getReviewsByIdeaIdUsingGET(args);
  return response.data;
});

const getIdeaReviewsReducers = (builder: ActionReducerMapBuilder<IdeasState>) => {
  builder.addCase(getIdeaReviews.fulfilled, (state, action) => {
    state.isLoadingReviews = false;
    state.isReviewsError = false;
    state.reviews[action.meta.arg] = action.payload;
  });
  builder.addCase(getIdeaReviews.pending, state => {
    state.isLoadingReviews = true;
    state.isReviewsError = false;
  });
  builder.addCase(getIdeaReviews.rejected, state => {
    state.isLoadingReviews = false;
    state.isReviewsError = true;
  });
};

export const deleteIdea = createAsyncThunk<void, number>('ideas/delete', async args => {
  await apiClient.deleteIdeaByIdUsingDELETE(args);
});

const deleteIdeaReducers = (builder: ActionReducerMapBuilder<IdeasState>) => {
  builder.addCase(deleteIdea.fulfilled, (state, action) => {
    state.isDeleting = false;
    state.isDeleteError = false;
    state.deletedIdeas = [...state.deletedIdeas, action.meta.arg];
    state.ideas = state.ideas?.filter(idea => idea.id !== action.meta.arg) || null;
  });
  builder.addCase(deleteIdea.pending, state => {
    state.isDeleting = true;
    state.isDeleteError = false;
  });
  builder.addCase(deleteIdea.rejected, state => {
    state.isDeleting = false;
    state.isDeleteError = true;
  });
};

export const blockIdea = createAsyncThunk<void, IdeaDto>('ideas/block', async args => {
  await apiClient.updateIdeaUsingPUT(args);
});

const blockIdeaReducers = (builder: ActionReducerMapBuilder<IdeasState>) => {
  builder.addCase(blockIdea.fulfilled, (state, action) => {
    state.isBlocking = false;
    state.isBlockError = false;
    if (action.meta.arg.id) state.blockedIdeas = [...state.deletedIdeas, action.meta.arg.id];
    state.ideas = state.ideas?.map(idea => (idea.id === action.meta.arg ? { ...idea, blocked: true } : idea)) || null;
  });
  builder.addCase(blockIdea.pending, state => {
    state.isBlocking = true;
    state.isBlockError = false;
  });
  builder.addCase(blockIdea.rejected, state => {
    state.isBlocking = false;
    state.isBlockError = true;
  });
};

export const getSubjects = createAsyncThunk<SubjectDto[]>('ideas/subjects', async () => {
  return (await apiClient.getAllSubjectsUsingGET()).data;
});

const getSubjectsReducers = (builder: ActionReducerMapBuilder<IdeasState>) => {
  builder.addCase(getSubjects.fulfilled, (state, action) => {
    state.isLoadingSubjects = false;
    state.isSubjectsError = false;
    state.subjects = action.payload;
  });
  builder.addCase(getSubjects.pending, state => {
    state.isLoadingSubjects = true;
    state.isSubjectsError = false;
  });
  builder.addCase(getSubjects.rejected, state => {
    state.isLoadingSubjects = false;
    state.isSubjectsError = true;
  });
};

export const getVotesForSubject = createAsyncThunk<number, number>('ideas/subjects-votes', async id => {
  return (await apiClient.getNumberOfAllowedVotesForSubjectUsingGET(id)).data;
});

const getVotesForSubjectReducers = (builder: ActionReducerMapBuilder<IdeasState>) => {
  builder.addCase(getVotesForSubject.fulfilled, (state, action) => {
    state.isLoadingVotes = false;
    state.isVotesError = false;
    state.subjectVotes = {
      ...state.subjectVotes,
      [action.meta.arg]: action.payload
    };
  });
  builder.addCase(getVotesForSubject.pending, state => {
    state.isLoadingVotes = true;
    state.isVotesError = false;
  });
  builder.addCase(getVotesForSubject.rejected, state => {
    state.isLoadingVotes = false;
    state.isVotesError = true;
  });
};

export const voteForSubjectIdeas = createAsyncThunk<void, { subjectId: number; votes: Record<string, number> }>(
  'votes/{subjectId}',
  async args => {
    const { subjectId, votes } = args;
    await apiClient.voteBySubjectIdUsingPOST(subjectId, votes);
  }
);

const createVoteForSubjectReducers = (builder: ActionReducerMapBuilder<IdeasState>) => {
  builder.addCase(voteForSubjectIdeas.fulfilled, (state, payload) => {
    state.isLoadingSubjects = false;
    state.isSubjectsError = false;
    state.subjects =
      state.subjects?.map(subject => {
        if (subject.id !== payload.meta.arg.subjectId) return subject;
        return {
          ...subject,
          done: true
        };
      }) ?? null;
  });
  builder.addCase(voteForSubjectIdeas.pending, state => {
    state.isLoadingSubjects = true;
    state.isSubjectsError = false;
    state.error = null;
  });
  builder.addCase(voteForSubjectIdeas.rejected, (state, action) => {
    state.isLoadingSubjects = false;
    state.isSubjectsError = true;
    state.error = action.error;
  });
};

export const voteForUncategorizedIdea = createAsyncThunk<void, { ideaId: number; accept: boolean }>(
  'votes/ideas/uncategorized/{id}',
  async (args, { dispatch }) => {
    const { accept, ideaId } = args;
    await apiClient.voteForUncategorizedIdeaUsingPOST(accept, ideaId);
    dispatch(getIdeas());
  }
);

const createVoteForUncategorizedIdeaReducers = (builder: ActionReducerMapBuilder<IdeasState>) => {
  builder.addCase(voteForUncategorizedIdea.fulfilled, state => {
    state.isLoadingSubjects = false;
    state.isSubjectsError = false;
  });
  builder.addCase(voteForUncategorizedIdea.pending, state => {
    state.isLoadingSubjects = true;
    state.isSubjectsError = false;
    state.error = null;
  });
  builder.addCase(voteForUncategorizedIdea.rejected, (state, action) => {
    state.isLoadingSubjects = false;
    state.isSubjectsError = true;
    state.error = action.error;
  });
};

export const ideasSlice = createSlice({
  name: 'ideas',
  initialState,
  reducers: {
    clearReviewError: state => {
      state.isCreateReviewError = false;
    },
    clearDeleteError: state => {
      state.isDeleteError = false;
    },
    clearReviewsError: state => {
      state.isReviewsError = false;
    },
    clearBlockError: state => {
      state.isBlockError = false;
    },
    clearSubjectsError: state => {
      state.isSubjectsError = false;
    },
    clearSubjectVotes: state => {
      state.subjectVotes = {};
    },
    clearIdeasState: state => {
      state.ideas = null;
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.isCreatingReview = false;
      state.isCreateReviewError = false;
      state.createdReviews = [];
      state.isLoadingReviews = false;
      state.isReviewsError = false;
      state.reviews = {};
      state.isDeleteError = false;
      state.isDeleting = false;
      state.deletedIdeas = [];
    }
  },
  extraReducers: builder => {
    createGetIdeasReducers(builder);
    createReviewIdeaReducers(builder);
    createVoteForSubjectReducers(builder);
    createVoteForUncategorizedIdeaReducers(builder);
    getIdeaReviewsReducers(builder);
    deleteIdeaReducers(builder);
    blockIdeaReducers(builder);
    getSubjectsReducers(builder);
    getVotesForSubjectReducers(builder);
  }
});

export const {
  clearReviewError,
  clearBlockError,
  clearDeleteError,
  clearReviewsError,
  clearIdeasState,
  clearSubjectVotes
} = ideasSlice.actions;

export default ideasSlice.reducer;
