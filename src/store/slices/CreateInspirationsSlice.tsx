import { ActionReducerMapBuilder, createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import apiClient, { CreatePostAnswerDto, PostDto } from '~/api-client';
import { PageableApiArgs } from '~/store/store';
import uniqBy from 'lodash/uniqBy';
import React from 'react';
import { FlexBox } from '~/components/Box';
import Loader from '~/components/Loader';
import { toast } from 'react-toastify';

export interface InspirationsState {
  inspirations: PostDto[];
  lastResultEmpty: boolean;
  isLoading: boolean;
  isError: boolean;
  error: SerializedError | null;
  currentPage: number;
  isCreatingComment: boolean;
  isCreateCommentError: boolean;
  isCreateCommentSuccess: boolean;
  creatingCommentToastIds: React.ReactText[];
  isRemovingInspiration: boolean;
}

const initialState: InspirationsState = {
  inspirations: [],
  lastResultEmpty: false,
  isLoading: false,
  isError: false,
  error: null,
  currentPage: 0,
  isCreatingComment: false,
  isCreateCommentError: false,
  isCreateCommentSuccess: true,
  creatingCommentToastIds: [],
  isRemovingInspiration: false
};

const CommentPendingMsg = () => {
  return (
    <FlexBox>
      <span>
        Komentarz jest zapisywany... <Loader size={20} borderSize={2} />
      </span>
    </FlexBox>
  );
};

export const getSingleInspiration = createAsyncThunk<PostDto, number>('inspirations/getSingle', async (id: number) => {
  const response = await apiClient.postGetPostByIdGet(id);
  return response.data;
});

export const getInspirations = createAsyncThunk<PostDto[], PageableApiArgs>(
  'inspirations/getAll',
  async (args: PageableApiArgs) => {
    const response = await apiClient.postGetAllGet(args.page, args.count);
    return response.data;
  }
);

export const deleteInspiration = createAsyncThunk<{ responseStatus: number; inspirationId: number }, number>(
  'inspirations/deleteSingle',
  async inspirationId => {
    const response = await apiClient.postDeletePostDelete(inspirationId);
    return {
      responseStatus: response.status,
      inspirationId
    };
  }
);

interface CreateCommentThunkReturn {
  responseStatus: number;
  postId: number | undefined;
}

export const createComment = createAsyncThunk<CreateCommentThunkReturn, CreatePostAnswerDto>(
  'comments/createComment',
  async (formData: CreatePostAnswerDto) => {
    const response = await apiClient.postCreatePostAnswerPost(formData);
    return {
      responseStatus: response.status,
      postId: formData.postId
    };
  }
);

export const createCommentAndThenUpdateInspiration = createAsyncThunk<void, Required<CreatePostAnswerDto>>(
  'inspirations/createCommentAndUpdateInspiration',
  async (formData: Required<CreatePostAnswerDto>, { dispatch }) => {
    await dispatch(createComment(formData));
    await dispatch(getSingleInspiration(formData.postId));
  }
);

const createGetInspirationsReducers = (builder: ActionReducerMapBuilder<InspirationsState>) => {
  builder.addCase(getInspirations.fulfilled, (state, action) => {
    state.inspirations = uniqBy([...state.inspirations, ...action.payload], obj => obj.id);
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
    const newInspirationIndex = state.inspirations.findIndex(obj => obj.id === action.payload.id);
    if (newInspirationIndex > -1) {
      state.inspirations[newInspirationIndex] = action.payload;
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

const createDeleteSingleInspirationReducers = (builder: ActionReducerMapBuilder<InspirationsState>) => {
  builder.addCase(deleteInspiration.fulfilled, (state, action) => {
    if (200 === action.payload.responseStatus) {
      toast.success('Inspiracja została usunięta.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      state.inspirations = state.inspirations.filter(insp => insp.id !== action.payload.inspirationId);
    } else {
      toast.error('Wystąpił problem podczas usuwania inspiracji i nie została ona usunięta.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
    state.isRemovingInspiration = false;
  });
  builder.addCase(deleteInspiration.pending, state => {
    state.isRemovingInspiration = true;
  });
  builder.addCase(deleteInspiration.rejected, state => {
    toast.error('Wystąpił problem podczas usuwania inspiracji i nie została ona usunięta.', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    state.isRemovingInspiration = false;
  });
};

const createCreateCommentReducers = (builder: ActionReducerMapBuilder<InspirationsState>) => {
  builder.addCase(createComment.fulfilled, (state, action) => {
    state.isCreatingComment = false;

    if (state.creatingCommentToastIds && state.creatingCommentToastIds.length) {
      toast.dismiss(state.creatingCommentToastIds.pop());
    }
    const success = [200, 201].includes(action.payload.responseStatus);
    if (success) {
      toast.success('Komentarz został dodany.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      state.isCreateCommentError = false;
      state.isCreateCommentSuccess = true;
    } else {
      toast.error('Wystąpił problem podczas dodawania komentarza i nie został on zapisany.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      state.isCreateCommentError = true;
      state.isCreateCommentSuccess = false;
    }
  });
  builder.addCase(createComment.pending, state => {
    state.creatingCommentToastIds.push(
      toast.info(<CommentPendingMsg />, {
        position: 'top-right',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    );
    state.isCreatingComment = true;
    state.isCreateCommentError = false;
    state.isCreateCommentSuccess = false;
  });
  builder.addCase(createComment.rejected, (state, action) => {
    state.isCreateCommentError = true;
    state.isCreatingComment = false;
    state.isCreateCommentSuccess = false;
    state.error = action.error;
    if (state.creatingCommentToastIds && state.creatingCommentToastIds.length) {
      toast.dismiss(state.creatingCommentToastIds.pop());
    }
    toast.error('Wystąpił problem podczas dodawania komentarza i nie został on zapisany.', {
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

export const inspirationsSlice = createSlice({
  name: 'inspirations',
  initialState,
  reducers: {},
  extraReducers: builder => {
    createGetInspirationsReducers(builder);
    createGetSingleInspirationReducers(builder);
    createCreateCommentReducers(builder);
    createDeleteSingleInspirationReducers(builder);
  }
});

export default inspirationsSlice.reducer;
