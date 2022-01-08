import { ActionReducerMapBuilder, createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import apiClient, { IdeaDto } from '~/api-client';

export interface IdeasState {
  ideas: IdeaDto[] | null;
  isLoading: boolean;
  isError: boolean;
  isCreatingReview: boolean;
  isReviewError: boolean;
  createdReviews: number[];
  error: SerializedError | null;
}

const initialState: IdeasState = {
  ideas: null,
  isLoading: false,
  isError: false,
  isCreatingReview: false,
  isReviewError: false,
  createdReviews: [],
  error: null
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
    state.isReviewError = false;
    state.createdReviews = [...state.createdReviews, action.meta.arg.ideaId];
    getIdeas();
  });
  builder.addCase(reviewIdea.pending, state => {
    state.isReviewError = false;
    state.isCreatingReview = true;
  });
  builder.addCase(reviewIdea.rejected, state => {
    state.isCreatingReview = false;
    state.isReviewError = true;
  });
};

export const ideasSlice = createSlice({
  name: 'ideas',
  initialState,
  reducers: {
    clearReviewError: state => {
      state.isReviewError = false;
    }
  },
  extraReducers: builder => {
    createGetIdeasReducers(builder);
    createReviewIdeaReducers(builder);
  }
});

export const { clearReviewError } = ideasSlice.actions;

export default ideasSlice.reducer;
