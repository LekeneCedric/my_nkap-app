import {IFinancialGoal} from "../../../../Domain/FinancialGoal/FinancialGoal.ts";

export default interface IGetAllFinancialGoalResponse {
    status: number,
    financialGoals: IFinancialGoal[],
}