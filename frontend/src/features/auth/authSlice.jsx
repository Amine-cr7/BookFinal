import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    role: user ? user.role : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkApi) => {
    try {
        return await authService.register(user);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.error) ||
            error.message ||
            error.toString();
        return thunkApi.rejectWithValue(message);
    }
});

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkApi) => {
    try {
        return await authService.login(user);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.error) ||
            error.message ||
            "Login error";
        return thunkApi.rejectWithValue(message);
    }
});

export const forget = createAsyncThunk('auth/forget', async (email, thunkApi) => {
    try {
        return await authService.forgetPassword(email);
    } catch (error) {
        const message =
            (error.response?.data?.error) ||
            error.message ||
            "Invalid Email";
        return thunkApi.rejectWithValue(message);
    }
});

export const resetPass = createAsyncThunk('auth/reset', async (data, thunkApi) => {
    try {
        return await authService.resetPassword(data); // { resetToken, newPassword }
    } catch (error) {
        const message = (error.response?.data?.message) || error.message || "Reset failed";
        return thunkApi.rejectWithValue(message);
    }
});
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        },
        logout: (state) => {
            state.user = null;
            state.role = null
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.role = state.user.role
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })

            // Forgot Password
            .addCase(forget.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = '';
            })
            .addCase(forget.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(forget.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            .addCase(resetPass.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = '';
            })
            .addCase(resetPass.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(resetPass.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
