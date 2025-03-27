import axios from "axios";

const API_URL = 'http://localhost:5000/api/users/';



const getUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    const response = await axios.get(API_URL, config)
    return response.data
}
const getUser = async (id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
    const response = await axios.get(`${API_URL}${id}`,config)
    return response.data
}

const createUser = async (userData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
      const response = await axios.post(API_URL, userData, config);
      return response.data;
  };

const userService = {
    getUsers,
    getUser,
    createUser
}
export default userService