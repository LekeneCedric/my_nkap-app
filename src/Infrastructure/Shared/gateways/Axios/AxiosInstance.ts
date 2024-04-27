import axios from "axios";
import { BASE_API_ROUTES as BASE_API_URL } from "../../../Api/routes";

const api = axios.create({
    baseURL: BASE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;