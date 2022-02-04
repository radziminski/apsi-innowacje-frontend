import { configureStore } from '@reduxjs/toolkit';
import addedFilesReducer from './slices/CreateIdeaAddedFilesSlice';
import userReducer from './slices/CreateUserSlice';
import ideasReducer from './slices/CreateIdeasSlice';
import inspirationsReducer from './slices/CreateInspirationsSlice';
import decisionsIdeasReducer from '~/store/slices/CreateDecisionsIdeasSlice';
import subjectsReducer from '~/store/slices/CreateSubjectsSlice';

export const store = configureStore({
  reducer: {
    addedFiles: addedFilesReducer,
    user: userReducer,
    ideas: ideasReducer,
    inspirations: inspirationsReducer,
    decisionsIdeas: decisionsIdeasReducer,
    subjects: subjectsReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['addedFiles/addFiles', 'addedFiles/removeDuplicationError']
      }
    })
});

export interface PageableApiArgs {
  page?: number;
  count?: number;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
