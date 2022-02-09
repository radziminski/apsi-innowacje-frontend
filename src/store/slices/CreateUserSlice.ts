import { clearAuthTokensInStorage, setAuthTokensInStorage } from './../../hooks/useAuthorizationInterceptor/index';
import { UserDto, LoggedUserDto } from './../../api-client/dotnet/api';
import { ActionReducerMapBuilder, createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import apiClient from '~/api-client';

export interface UserState {
  isAuthenticated: boolean | null;
  currentUser: UserDto | null;
  allUsers: UserDto[] | null;
  isLoading: boolean;
  isError: boolean;
  isUserAuthenticating: boolean;
  error: SerializedError | null;
  isLoadingAllUsers: boolean;
  isErrorAllUsers: boolean;
  errorAllUsers: SerializedError | null;
}

const initialState: UserState = {
  isAuthenticated: null,
  allUsers: null,
  currentUser: null,
  isLoading: true,
  isError: false,
  isUserAuthenticating: false,
  error: null,
  isLoadingAllUsers: false,
  isErrorAllUsers: false,
  errorAllUsers: null
};

export const login = createAsyncThunk<LoggedUserDto, { username: string; password: string }>(
  'user/login',
  async args => {
    const response = await apiClient.authAuthenticatePost(args);
    return response.data;
  }
);

const createLoginReducers = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addCase(login.fulfilled, (state, action) => {
    const { token, tokenExpirationDate, ...user } = action.payload;
    setAuthTokensInStorage(token ?? '', tokenExpirationDate ?? '');
    state.currentUser = user;
    state.isAuthenticated = true;
    state.isLoading = false;
    state.isError = false;
    state.error = null;
  });
  builder.addCase(login.pending, state => {
    state.isError = false;
    state.error = null;
    state.isLoading = true;
  });
  builder.addCase(login.rejected, (state, action) => {
    state.isLoading = false;
    state.isAuthenticated = false;
    state.isError = true;
    state.error = action.error;
  });
};

export const getMe = createAsyncThunk<LoggedUserDto, void>('user/getMe', async () => {
  const response = await apiClient.authGetLoggedUserGet();
  return response.data;
});

const createGetMeReducers = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addCase(getMe.fulfilled, (state, action) => {
    state.currentUser = action.payload;
    state.isAuthenticated = true;
    state.isLoading = false;
    state.isError = false;
    state.error = null;
  });
  builder.addCase(getMe.pending, state => {
    state.isError = false;
    state.error = null;
    state.isLoading = true;
  });
  builder.addCase(getMe.rejected, state => {
    state.isLoading = false;
    state.isAuthenticated = false;
  });
};

export const getAllUsers = createAsyncThunk<UserDto[] | null, void>('user/getAll', async () => {
  const response = await apiClient.usersUsersGet('', 0, 10000);
  return response.status === 200 ? response.data : null;
});

const createGetAllReducers = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addCase(getAllUsers.fulfilled, (state, action) => {
    if (action.payload !== null) {
      state.allUsers = action.payload;
    }
    state.isLoadingAllUsers = false;
    state.isErrorAllUsers = false;
    state.errorAllUsers = null;
  });
  builder.addCase(getAllUsers.pending, state => {
    state.isErrorAllUsers = false;
    state.errorAllUsers = null;
    state.isLoadingAllUsers = true;
  });
  builder.addCase(getAllUsers.rejected, (state, action) => {
    state.isLoadingAllUsers = false;
    state.isErrorAllUsers = true;
    state.errorAllUsers = action.error;
  });
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      clearAuthTokensInStorage();
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    setUserAuthenticating: (state, action) => {
      state.isUserAuthenticating = action.payload;
    }
  },
  extraReducers: builder => {
    createLoginReducers(builder);
    createGetMeReducers(builder);
    createGetAllReducers(builder);
  }
});

export const { logout, setUserAuthenticating } = userSlice.actions;

export default userSlice.reducer;
