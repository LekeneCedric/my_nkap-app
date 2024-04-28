import AuthenticationRoutes from "./AuthenticationRoutes";
import ProfessionApiRoutes from "./ProfessionApiRoutes";

export const BASE_API_ROUTES = 'http://192.168.1.101:8001/api';

export const ApiRoutes = {
    professions: ProfessionApiRoutes,
    authentication: AuthenticationRoutes,
}