import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
const API_URL =  'http://localhost:5000/api/books/';



const getBooks = async ({ language, categories , pageCount }) => {
    let url = `${API_URL}?`;
    
    if (language) url += `language=${language}&`;
    if (categories?.length) url += `categories=${categories.join(",")}&`;
    if (pageCount) url += `pageCount=${pageCount}&`;

    console.log("Fetching books from:", url);
    
    const response = await axios.get(url);
    return response.data;
};
// const createBook = async (bookData,token) => {
//     if(!token) throw new Error ("Authentication token is missing!")
//     const config = {
//         headers:{
//             Authorization:`Bearer ${token}`
//         }
//     }
//     const response = await axios.post(API_URL,bookData,config)
//     return response.data
// }
// features/books/bookSlice.js
// features/books/bookSlice.js
// features/books/bookSlice.js
const createBook = async (bookData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
  
  try {
    const response = await axios.post(API_URL, bookData, config);
    return response.data;
  } catch (error) {
    console.error('Error creating book:', error.response?.data);
    throw error;
  }
};


const getBookById = async (_id) => {
    const response = await axios.get(`${API_URL}${_id}`)
    return response.data
}

 
const bookService = {
    getBooks,
    getBookById,
    createBook
}

export default bookService