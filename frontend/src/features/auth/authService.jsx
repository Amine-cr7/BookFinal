import axios from 'axios';

const API_URL = '/api/auth/';

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};
<<<<<<< HEAD
const forgetPassword = async (userData) => {
    const response = await axios.post(API_URL + 'forgot-password', userData);
    return response.data
}
const resetPassword = async (userData) => {
    const response = await axios.post(API_URL + 'reset-password', userData);
    return response.data
}
const authService = {
    register,
    login,
    forgetPassword,
    resetPassword
=======

const authService = {
    register,
    login,
>>>>>>> 74e7283c466d136ca2465399e9eb17b8f9df8f2f
};

export default authService;