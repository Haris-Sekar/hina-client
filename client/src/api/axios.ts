import axios from 'axios';

const baseURL = "http://localhost:5000";

const API = axios.create({
    baseURL: `${baseURL}/api/v1/`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});


API.interceptors.request.use(
    async (response) => {
        const token = localStorage.getItem('token');
        if (token) {
            response.headers.Authorization = `Bearer ${token}`
        }
        return response;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export { API };