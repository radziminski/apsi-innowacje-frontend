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
  isDeletingComment: boolean;
  isDeleteCommentError: boolean;
  isDeleteCommentSuccess: boolean;
  deletingCommentToastIds: React.ReactText[];
  deletingInspirationToastIds: React.ReactText[];
  isDeletingInspiration: boolean;
  isDeletingInspirationSuccess: boolean;
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
  isDeletingComment: false,
  isDeleteCommentError: false,
  isDeleteCommentSuccess: false,
  deletingCommentToastIds: [],
  deletingInspirationToastIds: [],
  isDeletingInspiration: false,
  isDeletingInspirationSuccess: false
};

const CreateCommentPendingMsg = () => {
  return (
    <FlexBox>
      <span>
        Komentarz jest zapisywany... <Loader size={20} borderSize={2} />
      </span>
    </FlexBox>
  );
};

const DeleteCommentPendingMsg = () => {
  return (
    <FlexBox>
      <span>
        Komentarz jest usuwany... <Loader size={20} borderSize={2} />
      </span>
    </FlexBox>
  );
};

const DeleteInspirationPendingMsg = () => {
  return (
    <FlexBox>
      <span>
        Inspiracja jest usuwana... <Loader size={20} borderSize={2} />
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

export const createComment = createAsyncThunk<{ responseStatus: number }, CreatePostAnswerDto>(
  'comments/createComment',
  async (formData: CreatePostAnswerDto) => {
    const response = await apiClient.postCreatePostAnswerPost(formData);
    return {
      responseStatus: response.status
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

export const deleteComment = createAsyncThunk<{ responseStatus: number }, number>(
  'inspirations/deleteComment',
  async commentId => {
    const response = await apiClient.postDeletePostAnswerDelete(commentId);
    return {
      responseStatus: response.status
    };
  }
);

export const deleteCommentAndThenUpdateInspiration = createAsyncThunk<
  void,
  { commentId: number; inspirationId: number }
>('inspirations/deleteCommentAndUpdateInspiration', async ({ commentId, inspirationId }, { dispatch }) => {
  await dispatch(deleteComment(commentId));
  await dispatch(getSingleInspiration(inspirationId));
});

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
    if (state.deletingInspirationToastIds && state.deletingInspirationToastIds.length) {
      toast.dismiss(state.deletingInspirationToastIds.pop());
    }
    if (200 === action.payload.responseStatus) {
      state.isDeletingInspirationSuccess = true;
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
      state.isDeletingInspirationSuccess = false;
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
    state.isDeletingInspiration = false;
  });
  builder.addCase(deleteInspiration.pending, state => {
    state.isDeletingInspiration = true;
    state.isDeletingInspirationSuccess = false;
    state.deletingInspirationToastIds.push(
      toast.info(<DeleteInspirationPendingMsg />, {
        position: 'top-right',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    );
  });
  builder.addCase(deleteInspiration.rejected, state => {
    state.isDeletingInspirationSuccess = false;
    if (state.deletingInspirationToastIds && state.deletingInspirationToastIds.length) {
      toast.dismiss(state.deletingInspirationToastIds.pop());
    }
    toast.error('Wystąpił problem podczas usuwania inspiracji i nie została ona usunięta.', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    state.isDeletingInspiration = false;
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
      toast.info(<CreateCommentPendingMsg />, {
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

const createDeleteCommentReducers = (builder: ActionReducerMapBuilder<InspirationsState>) => {
  builder.addCase(deleteComment.fulfilled, (state, action) => {
    state.isDeletingComment = false;

    if (state.deletingCommentToastIds && state.deletingCommentToastIds.length) {
      toast.dismiss(state.deletingCommentToastIds.pop());
    }

    if (action.payload.responseStatus === 200) {
      toast.success('Komentarz został usunięty.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      state.isDeleteCommentError = false;
      state.isDeleteCommentSuccess = true;
    } else {
      toast.error('Wystąpił problem podczas usuwania komentarza.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      state.isDeleteCommentError = true;
      state.isDeleteCommentSuccess = false;
    }
  });
  builder.addCase(deleteComment.pending, state => {
    state.deletingCommentToastIds.push(
      toast.info(<DeleteCommentPendingMsg />, {
        position: 'top-right',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    );
    state.isDeletingComment = true;
    state.isDeleteCommentError = false;
    state.isDeleteCommentSuccess = false;
  });
  builder.addCase(deleteComment.rejected, (state, action) => {
    state.isDeleteCommentError = true;
    state.isDeletingComment = false;
    state.isDeleteCommentSuccess = false;
    state.error = action.error;
    if (state.deletingCommentToastIds && state.deletingCommentToastIds.length) {
      toast.dismiss(state.deletingCommentToastIds.pop());
    }
    toast.error('Wystąpił problem podczas usuwania komentarza i nie został on usunięty.', {
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
    createDeleteCommentReducers(builder);
    createDeleteSingleInspirationReducers(builder);
  }
});

export default inspirationsSlice.reducer;
