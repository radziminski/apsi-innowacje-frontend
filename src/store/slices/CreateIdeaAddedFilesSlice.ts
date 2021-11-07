import { createSlice, PayloadAction } from '@reduxjs/toolkit';

function* generateId() {
  let id = 0;

  while (true) {
    yield id++;
  }
}

export const ID_GENERATOR = generateId();

export interface FileEntry {
  file: File;
  id: number;
}

export interface AddedFilesState {
  addedFiles: FileEntry[];
  duplicationError: string | null;
}

const initialState: AddedFilesState = {
  addedFiles: [],
  duplicationError: null
};

const isDuplicated = (array: FileEntry[], fileName: string) => array.some(el => el.file.name === fileName);

export const addedFilesSlice = createSlice({
  name: 'addedFiles',
  initialState,
  reducers: {
    addFiles: (state, action: PayloadAction<File | File[]>) => {
      if (Array.isArray(action.payload)) {
        const duplicated = action.payload.find(file => isDuplicated(state.addedFiles, file.name));
        if (duplicated) {
          state.duplicationError = duplicated.name;
          return;
        }
        action.payload.forEach(file => {
          state.addedFiles.push({ file, id: ID_GENERATOR.next().value as number });
        });
      } else {
        if (isDuplicated(state.addedFiles, action.payload.name)) {
          state.duplicationError = action.payload.name;
          return;
        }
        state.addedFiles.push({ file: action.payload, id: ID_GENERATOR.next().value as number });
      }
    },
    removeFile: (state, action: PayloadAction<number>) => {
      const index = state.addedFiles.findIndex(el => el.id === action.payload);
      if (index > -1) {
        state.addedFiles.splice(index, 1);
      }
    },
    removeDuplicationError: state => {
      state.duplicationError = null;
    }
  }
});

// Action creators are generated for each case reducer function
export const { addFiles, removeFile, removeDuplicationError } = addedFilesSlice.actions;

export default addedFilesSlice.reducer;
