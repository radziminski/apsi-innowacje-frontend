import apiClient, { SubjectDto } from '~/api-client';
import { ActionReducerMapBuilder, createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export interface SubjectsState {
  subjects: SubjectDto[];
  isLoading: boolean;
  isError: boolean;
  error: SerializedError | null;
}

const initialState: SubjectsState = {
  subjects: [],
  isLoading: false,
  isError: false,
  error: null
};

export const getAllSubjects = createAsyncThunk<{ subjects: SubjectDto[] | null }, void>('subjects/getAll', async () => {
  const response = await apiClient.getAllSubjectsUsingGET();

  return {
    subjects: response.status === 200 ? response.data : null
  };
});

const createGetAllSubjectsReducers = (builder: ActionReducerMapBuilder<SubjectsState>) => {
  builder.addCase(getAllSubjects.fulfilled, (state, action) => {
    if (action.payload.subjects === null) {
      toast.error('Wystąpił problem podczas pobierania tematów.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      state.isError = true;
    } else {
      state.subjects = action.payload.subjects;
      state.isError = false;
    }
    state.isLoading = false;
  });
  builder.addCase(getAllSubjects.pending, state => {
    state.isLoading = true;
    state.isError = false;
  });
  builder.addCase(getAllSubjects.rejected, state => {
    state.isLoading = false;
    state.isError = true;
    toast.error('Wystąpił problem podczas pobierania tematów.', {
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

export const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {},
  extraReducers: builder => {
    createGetAllSubjectsReducers(builder);
  }
});

export default subjectsSlice.reducer;
