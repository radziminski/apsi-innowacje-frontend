import { ActionReducerMapBuilder, createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import apiClient, { IdeaDto } from '~/api-client';

export interface IdeasState {
  ideas: IdeaDto[] | null;
  isLoading: boolean;
  isError: boolean;
  error: SerializedError | null;
}

const initialState: IdeasState = {
  ideas: null,
  isLoading: false,
  isError: false,
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

export const ideasSlice = createSlice({
  name: 'ideas',
  initialState,
  reducers: {},
  extraReducers: builder => {
    createGetIdeasReducers(builder);
  }
});

export default ideasSlice.reducer;
