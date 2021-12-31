import { ActionReducerMapBuilder, createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import apiClient, { PostDto } from '~/api-client';
import { PageableApiArgs } from '~/store/store';
import uniqBy from 'lodash/uniqBy';

export interface InspirationsState {
  inspirations: PostDto[] | null;
  lastResultEmpty: boolean;
  isLoading: boolean;
  isError: boolean;
  error: SerializedError | null;
  currentPage: number;
}

const initialState: InspirationsState = {
  inspirations: null,
  lastResultEmpty: false,
  isLoading: false,
  isError: false,
  error: null,
  currentPage: 0
};

export const getSingleInspiration = createAsyncThunk<PostDto, { id: number }>(
  'inspirations/getSingle',
  async (args: { id: number }) => {
    const response = await apiClient.postGetPostByIdGet(args.id);
    return response.data;
  }
);

export const getInspirations = createAsyncThunk<PostDto[], PageableApiArgs>(
  'inspirations/getAll',
  async (args: PageableApiArgs) => {
    const response = await apiClient.postGetAllGet(args.page, args.count);
    return response.data;
  }
);

const createGetInspirationsReducers = (builder: ActionReducerMapBuilder<InspirationsState>) => {
  builder.addCase(getInspirations.fulfilled, (state, action) => {
    state.inspirations = uniqBy([...(state.inspirations || []), ...action.payload], obj => obj.id);
    state.lastResultEmpty = action.payload.length === 0;
    state.isLoading = false;
    state.isError = false;
    state.error = null;
    state.currentPage++;
  });
  builder.addCase(getInspirations.pending, state => {
    state.isError = false;
    state.lastResultEmpty = false;
    state.error = null;
    state.isLoading = true;
  });
  builder.addCase(getInspirations.rejected, (state, action) => {
    state.isLoading = false;
    state.lastResultEmpty = false;
    state.isError = true;
    state.error = action.error;
  });
};

const createGetSingleInspirationReducers = (builder: ActionReducerMapBuilder<InspirationsState>) => {
  builder.addCase(getSingleInspiration.fulfilled, (state, action) => {
    const newInspirationIndex = state.inspirations
      ? state.inspirations.findIndex(obj => obj.id === action.payload.id)
      : -1;
    if (newInspirationIndex > -1) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      state.inspirations![newInspirationIndex] = action.payload;
    } else if (state.inspirations === null) {
      state.inspirations = [action.payload];
    } else {
      state.inspirations = [...state.inspirations, action.payload];
    }
    state.isLoading = false;
    state.isError = false;
    state.error = null;
  });
  builder.addCase(getSingleInspiration.pending, state => {
    state.isError = false;
    state.error = null;
    state.isLoading = true;
  });
  builder.addCase(getSingleInspiration.rejected, (state, action) => {
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
    createGetSingleInspirationReducers(builder);
  }
});

export default inspirationsSlice.reducer;
