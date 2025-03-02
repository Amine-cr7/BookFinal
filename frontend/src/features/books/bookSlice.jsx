import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import bookService from "./bookService";

const initialState = {
    books: [],
    isError: '',
    isSuccess: '',
    isLoading: '',
    message: ''
}

export const getBooks = createAsyncThunk('books/getAll',async (_,thunkApi) =>{
    try{
      return  await bookService.getBooks()
    }catch (error) {
        const message = (error.message && error.response.data && error.response.data.message)
            || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers:(builder) => {
        builder
        .addCase(getBooks.pending,(state) => {
            state.isLoading = true
        })
        .addCase(getBooks.fulfilled,(state,action) => {
            state.isLoading = false
            state.books = action.payload
            state.isError = false
        })
        .addCase(getBooks.rejected,(state,action) => {
            state.isLoading = false
            state.message = action.payload
            state.isError = true
        })
    }
})

export const { reset } = bookSlice.actions

export default bookSlice.reducer