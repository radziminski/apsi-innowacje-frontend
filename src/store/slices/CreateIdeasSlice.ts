import { ReviewDto } from './../../api-client/java/api';
import { ActionReducerMapBuilder, createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import apiClient, { IdeaDto } from '~/api-client';

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
  reviews: {}
};

export const getIdeas = createAsyncThunk<IdeaDto[], void>('ideas/getAll', async () => {
  const response = await apiClient.getAllIdeasUsingGET();
  return response.data;
});

const createGetIdeasReducers = (builder: ActionReducerMapBuilder<IdeasState>) => {
  builder.addCase(getIdeas.fulfilled, (state, action) => {
    state.ideas = [...action.payload];
    state.isLoading = false;
    state.isError = false;
    state.error = null;
  });
  builder.addCase(getIdeas.pending, state => {
    state.isError = false;
    state.error = null;
    state.isLoading = true;
  });
  builder.addCase(getIdeas.rejected, (state, action) => {
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
    getIdeas();
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

export const ideasSlice = createSlice({
  name: 'ideas',
  initialState,
  reducers: {
    clearReviewError: state => {
      state.isCreateReviewError = false;
    }
  },
  extraReducers: builder => {
    createGetIdeasReducers(builder);
    createReviewIdeaReducers(builder);
    getIdeaReviewsReducers(builder);
  }
});

export const { clearReviewError } = ideasSlice.actions;

export default ideasSlice.reducer;
