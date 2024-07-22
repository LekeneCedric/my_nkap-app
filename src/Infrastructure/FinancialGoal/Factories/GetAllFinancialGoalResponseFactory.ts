import IGetAllFinancialGoalResponse from "../../../Feature/FinancialGoal/Thunks/GetAll/GetAllFinancialGoalResponse.ts";
import {IFinancialGoal} from "../../../Domain/FinancialGoal/FinancialGoal.ts";

export default class GetAllFinancialGoalResponseFactory {
    static fromApi(result: any): IGetAllFinancialGoalResponse{
        return {
            status: result.status,
            financialGoals: result.financialGoals.map((item: any): IFinancialGoal => {
                return {
                    id: item.id,
                    accountId: item.accountId,
                    startDate: item.startDate,
                    endDate: item.endDate,
                    title: item.title,
                    currentAmount: parseInt(item.currentAmount),
                    desiredAmount: parseInt(item.desiredAmount),
                    isComplete: item.isComplete,
                }
            })
        }
    }
}