import AccountRoutes from "./AccountRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes";
import ProfessionApiRoutes from "./ProfessionApiRoutes";
import OperationsRoutes from "./OperationsRoutes.ts";
import CategoryRoutes from "./CategoryRoutes.ts";
import FinancialGoalRoutes from "./FinancialGoalRoutes.ts";
import StatisticsRoutes from "./StatisticsRoutes.ts";
import {BASE_API_URL} from '@env';

export const BASE_API_ROUTES = BASE_API_URL;

export const ApiRoutes = {
    professions: ProfessionApiRoutes,
    authentication: AuthenticationRoutes,
    account: AccountRoutes,
    operations: OperationsRoutes,
    category: CategoryRoutes,
    financialGoal: FinancialGoalRoutes,
    statistics: StatisticsRoutes,
    gemini: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
}