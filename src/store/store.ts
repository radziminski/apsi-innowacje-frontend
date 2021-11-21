import { configureStore } from '@reduxjs/toolkit';
import addedFilesReducer from './slices/CreateIdeaAddedFilesSlice';
import userReducer from './slices/CreateUserSlice';
import ideasReducer from './slices/CreateIdeasSlice';

export const store = configureStore({
  reducer: {
    addedFiles: addedFilesReducer,
    user: userReducer,
    ideas: ideasReducer
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
