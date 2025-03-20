import axios from 'axios';
import {ACCESS_TOKEN} from "../constants.js";

const Api = axios.create({
    baseURL: 'http://localhost:8000',
    // Optionally add headers, timeouts, etc.
});
Api.interceptors.request.use(config => {
    const token = localStorage.getItem(ACCESS_TOKEN); // Adjust token retrieval as necessary
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

export default Api;