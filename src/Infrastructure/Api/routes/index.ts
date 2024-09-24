import AccountRoutes from "./AccountRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes";
import ProfessionApiRoutes from "./ProfessionApiRoutes";
import OperationsRoutes from "./OperationsRoutes.ts";
import CategoryRoutes from "./CategoryRoutes.ts";
import FinancialGoalRoutes from "./FinancialGoalRoutes.ts";
import StatisticsRoutes from "./StatisticsRoutes.ts";

export const BASE_API_ROUTES = process.env.API_URL ?? 'http://192.168.42.137:8001/api';

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