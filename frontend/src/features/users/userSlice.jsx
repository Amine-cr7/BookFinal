import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import userService from "./userService"


const initialState = {
    users: [],
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};


export const getUsers = createAsyncThunk('users/getAll', async (_, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user?.jwtToken;
        if (!token) throw new Error("Missing authentication token!");
        return await userService.getUsers(token);
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.error)
            || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})
export const getUser = createAsyncThunk('users/getOne', async (id, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user?.jwtToken;
        if (!token) throw new Error("Missing authentication token!");
        return await userService.getUser(id, token);
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.error)
            || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})
export const createUser = createAsyncThunk(
    'users/create',
    async (userData, thunkApi) => {
        try {
            const token = thunkApi.getState().auth.user?.jwtToken;
            if (!token) throw new Error("Missing authentication token!");
            return await userService.createUser(userData, token);
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkApi.rejectWithValue(message);
        }
    }
);
export const updateUser = createAsyncThunk(
    'user/update',
    async ({ _id, UpdateUser }, thunkApi) => {
        try {
            const token = thunkApi.getState().auth.user?.jwtToken;
            if (!token) throw new Error("Missing authentication token!");
            return await userService.updateUser(_id, UpdateUser, token);
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkApi.rejectWithValue(message);
        }
    }
);
export const deleteUser = createAsyncThunk(
    'users/delete',
    async (_id, thunkApi) => {
        try {
            const token = thunkApi.getState().auth.user?.jwtToken;

            if (!token) throw new Error("Missing authentication token!");
            return await userService.deleteUser(_id, token);
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkApi.rejectWithValue(message);
        }
    }
);


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            // get Users
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
                state.isError = false;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
            })
            // get user
            .addCase(getUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.isError = false;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
            })
            // create user
            .addCase(createUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users.push(action.payload);
                state.isError = false;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
            })
            //update
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.users.findIndex(user => user._id === action.payload._id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
                state.isError = false;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
            })
            //delete
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.users.findIndex(user => user._id === action.payload._id);
                if (index !== -1) {
                    state.users.splice(index, 1);
                }

                state.isError = false;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
            })

    }
})

export const { reset } = userSlice.actions

export default userSlice.reducer