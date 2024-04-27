import api from "./AxiosInstance";

api.interceptors.request.use(
    config => {
        // const token = 'token';
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
);

// TODO: can add response interceptor to add specifics operation when response status is false
export default api;