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


const getBookById = async (_id) => {
    const response = await axios.get(`${API_URL}${_id}`)
    return response.data
}
 
const bookService = {
    getBooks,
    getBookById
}

export default bookService