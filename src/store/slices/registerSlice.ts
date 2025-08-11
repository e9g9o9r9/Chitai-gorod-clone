import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import authService from '../../services/authService';
import { AuthState, RegisterUserData, RegisterResponse, User } from '../../types/authTypes';

const initialState: AuthState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Async thunk для регистрации
export const register = createAsyncThunk<
  RegisterResponse,
  RegisterUserData,
  { rejectValue: string }
>(
  'auth/register',
  async (userData: RegisterUserData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    reset: (state: AuthState) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state: AuthState) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state: AuthState, action: PayloadAction<RegisterResponse>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state: AuthState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      });
  },
});

export const { reset } = registerSlice.actions;
export default registerSlice.reducer;