import axios from 'axios'
const API_URL =  'http://localhost:5000/api/books/';



const getBooks = async () => {
    const response = await axios.get(API_URL)
    return response.data;
}

const getBookById = async (_id) => {
    const response = await axios.get(`${API_URL}${_id}`) 
    console.log("Fetching book with ID:", _id);
    console.log("API Response:", response.data);
    return response.data
}
 
const bookService = {
    getBooks,
    getBookById
}
export default bookService