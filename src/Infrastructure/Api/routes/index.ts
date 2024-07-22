import AccountRoutes from "./AccountRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes";
import ProfessionApiRoutes from "./ProfessionApiRoutes";
import OperationsRoutes from "./OperationsRoutes.ts";
import CategoryRoutes from "./CategoryRoutes.ts";
import FinancialGoalRoutes from "./FinancialGoalRoutes.ts";

export const BASE_API_ROUTES = 'http://192.168.43.31:80/api';

export const ApiRoutes = {
    professions: ProfessionApiRoutes,
    authentication: AuthenticationRoutes,
    account: AccountRoutes,
    operations: OperationsRoutes,
    category: CategoryRoutes,
    financialGoal: FinancialGoalRoutes,
}