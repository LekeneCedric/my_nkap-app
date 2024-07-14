import AccountRoutes from "./AccountRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes";
import ProfessionApiRoutes from "./ProfessionApiRoutes";
import OperationsRoutes from "./OperationsRoutes.ts";
import CategoryRoutes from "./CategoryRoutes.ts";
import FinancialGoalRoutes from "./FinancialGoalRoutes.ts";

export const BASE_API_ROUTES = 'https://2d1d-102-244-45-102.ngrok-free.app/api';

export const ApiRoutes = {
    professions: ProfessionApiRoutes,
    authentication: AuthenticationRoutes,
    account: AccountRoutes,
    operations: OperationsRoutes,
    category: CategoryRoutes,
    financialGoal: FinancialGoalRoutes,
}