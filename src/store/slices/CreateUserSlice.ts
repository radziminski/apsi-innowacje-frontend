import { setAuthTokensInStorage } from './../../hooks/useAuthorizationInterceptor/index';
import { UserDto, LoggedUserDto } from './../../api-client/dotnet/api';
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '~/api-client';

export interface UserState {
  isAuthenticated: boolean;
  currentUser: UserDto | null;
  isLoading: boolean;
}

const initialState: UserState = {
  isAuthenticated: false,
  currentUser: null,
  isLoading: false
};

const login = createAsyncThunk<LoggedUserDto, { username: string; password: string }>('user/login', async args => {
  const response = await apiClient.authAuthenticatePost(args);
  return response.data;
});

const createLoginReducers = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addCase(login.fulfilled, (state, action) => {
    const { token, tokenExpirationDate, ...user } = action.payload;
    setAuthTokensInStorage(token ?? '', tokenExpirationDate ?? '');
    state.currentUser = user;
    state.isAuthenticated = true;
    state.isLoading = false;
  });
  builder.addCase(login.pending, state => {
    state.isLoading = true;
  });
  builder.addCase(login.rejected, state => {
    state.isLoading = false;
    state.isAuthenticated = false;
  });
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    createLoginReducers(builder);
  }
});

export default userSlice.reducer;
