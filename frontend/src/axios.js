import axios from 'axios';
import { redirect } from 'react-router-dom';

export { axiosInstance };

const baseUrl = 'http://localhost:8000/limit-order-book/';
const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('access_token')
            ? 'Bearer ' + localStorage.getItem('access_token')
            : null,
        'Content-Type': 'application/json',
        accept: 'application/json',
    }
})

axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status == 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken  = localStorage.getItem('refresh_token');
                const response = await axiosInstance.post('api/token/refresh/', { 'refresh': refreshToken });
                const { token } = response.data;
                localStorage.setItem('access_token', token);
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axios(originalRequest);
            } catch(error) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                axiosInstance.defaults.headers['Authorization'] = null;
                return redirect('/');
            }
        }
        return Promise.reject(error);
    }
)