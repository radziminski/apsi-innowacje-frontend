import { configureStore } from '@reduxjs/toolkit';
import addedFilesReducer from './slices/CreateIdeaAddedFilesSlice';

export const store = configureStore({
  reducer: {
    addedFiles: addedFilesReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['addedFiles/addFiles', 'addedFiles/removeDuplicationError']
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
