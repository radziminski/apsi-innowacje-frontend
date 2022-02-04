import { ReviewDto } from './../../api-client/java/api';
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
  blockedIdeas: []
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
    getIdeaReviewsReducers(builder);
    deleteIdeaReducers(builder);
    blockIdeaReducers(builder);
  }
});

export const { clearReviewError, clearBlockError, clearDeleteError, clearReviewsError, clearIdeasState } =
  ideasSlice.actions;

export default ideasSlice.reducer;
