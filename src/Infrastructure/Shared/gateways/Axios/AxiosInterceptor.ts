import { useAppSelector } from "../../../../app/hook";
import { store } from "../../../../app/store";
import { selectToken } from "../../../../Feature/Authentication/AuthenticationSelector";
import api from "./AxiosInstance";

api.interceptors.request.use(
    config => {
        const token = selectToken(store.getState())
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
);

// TODO: can add response interceptor to add specifics operation when response status is false
export default api;