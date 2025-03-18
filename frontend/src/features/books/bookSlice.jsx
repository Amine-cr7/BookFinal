import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import bookService from "./bookService";

const initialState = {
    books: [],
    selectedBook : null ,
    isError: '',
    isSuccess: '',
    isLoading: '',
    message: ''
}

export const getBooks = createAsyncThunk('books/getAll',async (language = null,thunkApi) =>{
    try{
      return  await bookService.getBooks(language)
    }catch (error) {
        const message = (error.message && error.response.data && error.response.data.error)
            || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})

export const getBookById = createAsyncThunk('book/getBookByid',async(id,thunkApi) =>{
    try{
        return await bookService.getBookById(id)
    }catch (error) {
        const message = (error.message && error.response.data && error.response.data.error)
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

        .addCase(getBookById.pending,(state) => {
            state.isLoading = true
        })
        .addCase(getBookById.fulfilled,(state,action) => {
            state.isLoading = false
            state.selectedBook = action.payload
            state.isError = false
        })
        .addCase(getBookById.rejected,(state,action) => {
            state.isLoading = false
            state.message = action.payload
            state.isError = true
        })
    }
})

export const { reset } = bookSlice.actions

export default bookSlice.reducer