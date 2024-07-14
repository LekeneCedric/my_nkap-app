import ISaveFinancialGoalResponse from "../../../Feature/FinancialGoal/Thunks/Save/ISaveFinancialGoalResponse.ts";

export default class SaveFinancialGoalResponseFactory {
static fromApi(result: any): ISaveFinancialGoalResponse {
        return {
            status: result.status,
            message: result.message,
            isMake: result.isMake,
            createdAt: result?.createdAt,
            financialGoalId: result?.financialGoalId,
        };
    }
}