import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
const API_URL =  'http://localhost:5000/api/books/';



const getBooks = async ({ language, categories , pageCount }) => {
    let url = `${API_URL}?`;
    
    if (language) url += `language=${language}&`;
    if (categories?.length) url += `categories=${categories.join(",")}&`;
    if (pageCount) url += `pageCount=${pageCount}&`;

    
    
    const response = await axios.get(url);
    return response.data;
};

const createBook = async (bookData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
    const response = await axios.post(API_URL, bookData, config);
    return response.data;
};


const getBookById = async (_id) => {
    const response = await axios.get(`${API_URL}${_id}`)
    return response.data
}

const updateBook = async (_id,Updatebook,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
  const response = await axios.put(`${API_URL}${_id}`,Updatebook,config)
  return response.data
}

const deleteBook = async (_id,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
  const response = await axios.delete(`${API_URL}${_id}`,config)
  return response.data
}
 
const bookService = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}

export default bookService