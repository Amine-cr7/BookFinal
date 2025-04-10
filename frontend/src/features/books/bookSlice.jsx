import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import bookService from "./bookService";

const initialState = {
    books: { books: [] },
    selectedBook: null,
    isError: '',
    isSuccess: '',
    isLoading: '',
    message: ''
}

export const getBooks = createAsyncThunk('books/getAll', async (language = null, thunkApi) => {
    try {
        return await bookService.getBooks(language)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.error)
            || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})

export const getBookById = createAsyncThunk('book/getBookByid', async (id, thunkApi) => {
    try {
        return await bookService.getBookById(id)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.error)
            || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})
export const createBook = createAsyncThunk(
    'books/create',
    async (bookData, thunkApi) => {
        try {
            const token = thunkApi.getState().auth.user?.jwtToken;
            if (!token) throw new Error("Missing authentication token!");
            return await bookService.createBook(bookData, token);
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkApi.rejectWithValue(message);
        }
    }
);
export const updateBook = createAsyncThunk(
    'books/update',
    async ({ _id, Updatebook }, thunkApi) => {
        try {
            const token = thunkApi.getState().auth.user?.jwtToken;

            if (!token) throw new Error("Missing authentication token!");
            return await bookService.updateBook(_id, Updatebook, token);
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkApi.rejectWithValue(message);
        }
    }
);

export const deleteBook = createAsyncThunk(
    'books/delete',
    async ( _id, thunkApi) => {
        try {
            const token = thunkApi.getState().auth.user?.jwtToken;

            if (!token) throw new Error("Missing authentication token!");
            return await bookService.deleteBook(_id, token);
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkApi.rejectWithValue(message);
        }
    }
);


export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBook.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createBook.fulfilled, (state, action) => {
                state.isLoading = false;
                state.books.books.push(action.payload);
                state.isError = false;
            })
            .addCase(createBook.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
            })

            // update 
            .addCase(updateBook.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.books.books.findIndex(book => book._id === action.payload._id);
                if (index !== -1) {
                    state.books.books[index] = action.payload;
                }
                state.isError = false;
            })
            .addCase(updateBook.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
            })
            // delete
            .addCase(deleteBook.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.isLoading = false;
                state.books.books.splice(state.books.books.findIndex(book => book._id ===  action.payload._id),1)
                state.isError = false;
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
            })
            //
            .addCase(getBooks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.isLoading = false
                state.books = action.payload
                state.isError = false
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
            })

            .addCase(getBookById.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBookById.fulfilled, (state, action) => {
                state.isLoading = false
                state.selectedBook = action.payload
                state.isError = false
            })
            .addCase(getBookById.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
            })
    }
})

export const { reset } = bookSlice.actions

export default bookSlice.reducer