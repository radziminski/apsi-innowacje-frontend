import { clearAuthTokensInStorage, setAuthTokensInStorage } from './../../hooks/useAuthorizationInterceptor/index';
import { UserDto, LoggedUserDto } from './../../api-client/dotnet/api';
import { ActionReducerMapBuilder, createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import apiClient from '~/api-client';

export interface UserState {
  isAuthenticated: boolean | null;
  currentUser: UserDto | null;
  isLoading: boolean;
  isError: boolean;
  error: SerializedError | null;
}

const initialState: UserState = {
  isAuthenticated: null,
  currentUser: null,
  isLoading: false,
  isError: false,
  error: null
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
  builder.addCase(getMe.rejected, (state, action) => {
    state.isLoading = false;
    state.isAuthenticated = false;
    state.isError = true;
    state.error = action.error;
  });
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      clearAuthTokensInStorage();
      state.isAuthenticated = false;
    }
  },
  extraReducers: builder => {
    createLoginReducers(builder);
    createGetMeReducers(builder);
  }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
