import { DecisionDto } from './../../api-client/java/api';
import { ActionReducerMapBuilder, createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import apiClient from '~/api-client';

export interface VoteState {
  isLoading: boolean;
  isError: boolean;
  error: SerializedError | null;
}

const initialState: VoteState = {
  isLoading: false,
  isError: false,
  error: null,
};

export const voteIdea = createAsyncThunk<void, { ideaId: number; decision: DecisionDto }>(
  'ideas/{ideaId}/decision',
  async args => {
    const { ideaId, decision } = args;
    await apiClient.addDecisionForIdeaUsingPUT(ideaId, decision);
  }
);

const createVoteIdeaReducers = (builder: ActionReducerMapBuilder<VoteState>) => {
  builder.addCase(voteIdea.fulfilled, state => {
    state.isLoading = false;
    state.isError = false;
    state.error = null;
  });
  builder.addCase(voteIdea.pending, state => {
    state.isError = false;
    state.error = null;
    state.isLoading = true;
  });
  builder.addCase(voteIdea.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.error = action.error;
  });
};

export const voteSlice = createSlice({
  name: 'voting',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    createVoteIdeaReducers(builder);
  }
});

export default voteSlice.reducer;
