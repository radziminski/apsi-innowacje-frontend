import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IdeaDto } from '~/api-client/java';
import apiClient from '~/api-client';
import { toast } from 'react-toastify';

export interface IdeasState {
  ideasBySubject: Record<number, IdeaDto[]>;
  isLoading: boolean;
}

const initialState: IdeasState = {
  ideasBySubject: {},
  isLoading: false
};

export const getIdeasBySubject = createAsyncThunk<{ ideas: IdeaDto[] | null; subjectId: number }, number>(
  'ideas/getBySubject',
  async subjectId => {
    // TODO get by subject not working so far
    const response = await apiClient.getAllIdeasUsingGET();
    return {
      ideas: response.status === 200 ? response.data : null,
      subjectId
    };
  }
);

const createGetIdeasBySubjectReducers = (builder: ActionReducerMapBuilder<IdeasState>) => {
  builder.addCase(getIdeasBySubject.fulfilled, (state, action) => {
    if (action.payload.ideas === null) {
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
