import axios from "axios";

const API_URL = 'http://localhost:5000/api/favorite/';



// const getFavorite = async (token) => {
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         }
//     };

//     const response = await axios.get(API_URL, config)
//     return response.data
// }
const getFavorite = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    };
    const response = await axios.get(API_URL, config);
    console.log(response.data);  // تحقق من الاستجابة هنا
    return response.data;
};


const setFavorite = async (favoriteData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
      const response = await axios.post(API_URL, favoriteData, config);
      return response.data;
  };
  const deleteFavorite = async (_id,token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    const response = await axios.delete(`${API_URL}${_id}`,config)
    return response.data
  }


const favoriteService = {
    getFavorite,
    setFavorite,
    deleteFavorite
    
}
export default favoriteService