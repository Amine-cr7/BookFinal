import axios from 'axios'
const API_URL = '/api/books';



const getBooks = async () => {
    const response = await axios.get(API_URL)
    return response.data;
}

const bookService = {
    getBooks,
}
export default bookService