import { ActionReducerMapBuilder, createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import apiClient, { PostDto } from '~/api-client';
import { PageableApiArgs } from '~/store/store';

export interface InspirationsState {
  inspirations: PostDto[] | null;
  isLoading: boolean;
  isError: boolean;
  error: SerializedError | null;
  currentPage: number;
}

const initialState: InspirationsState = {
  inspirations: null,
  isLoading: false,
  isError: false,
  error: null,
  currentPage: 0
};

export const getInspirations = createAsyncThunk<PostDto[], PageableApiArgs>(
  'inspirations/getAll',
  async (args: PageableApiArgs) => {
    const response = await apiClient.postGetAllGet(args.page, args.count);
    return response.data;
  }
);

const createGetInspirationsReducers = (builder: ActionReducerMapBuilder<InspirationsState>) => {
  builder.addCase(getInspirations.fulfilled, (state, action) => {
    state.inspirations = [...(state.inspirations || []), ...action.payload];
    state.isLoading = false;
    state.isError = false;
    state.error = null;
    state.currentPage++;
  });
  builder.addCase(getInspirations.pending, state => {
    state.isError = false;
    state.error = null;
    state.isLoading = true;
  });
  builder.addCase(getInspirations.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.error = action.error;
  });
};

export const inspirationsSlice = createSlice({
  name: 'inspirations',
  initialState,
  reducers: {},
  extraReducers: builder => {
    createGetInspirationsReducers(builder);
  }
});

export default inspirationsSlice.reducer;
