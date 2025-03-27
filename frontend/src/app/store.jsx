import { configureStore } from "@reduxjs/toolkit";
import  bookReducer  from "../features/books/bookSlice";
import authReducer from "../features/auth/authSlice"
import userReducer from "../features/users/userSlice"
export const store = configureStore({
    reducer:{
        books:bookReducer,
        auth:authReducer,
        users:userReducer,
    }
})