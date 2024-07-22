import IDeleteFinancialGoalResponse from "../../../Feature/FinancialGoal/Thunks/Delete/DeleteFinancialGoalResponse.ts";

export default class DeleteFinancialGoalResponseFactory {

    static fromApi(result: any): IDeleteFinancialGoalResponse {
        return {
            status: result.status,
            isDeleted: result.isDeleted,
        }
    }
}