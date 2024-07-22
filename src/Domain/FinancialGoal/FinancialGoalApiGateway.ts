import ISaveFinancialGoalCommand from "../../Feature/FinancialGoal/Thunks/Save/SaveFinancialGoalCommand.ts";
import ISaveFinancialGoalResponse from "../../Feature/FinancialGoal/Thunks/Save/SaveFinancialGoalResponse.ts";
import IDeleteFinancialGoalCommand from "../../Feature/FinancialGoal/Thunks/Delete/DeleteFinancialGoalCommand.ts";
import IDeleteFinancialGoalResponse from "../../Feature/FinancialGoal/Thunks/Delete/DeleteFinancialGoalResponse.ts";
import IGetAllFinancialGoalCommand from "../../Feature/FinancialGoal/Thunks/GetAll/GetAllFinancialGoalCommand.ts";
import IGetAllFinancialGoalResponse from "../../Feature/FinancialGoal/Thunks/GetAll/GetAllFinancialGoalResponse.ts";

export default interface IFinancialGoalApiGateway {
    getAll: (command: IGetAllFinancialGoalCommand) => Promise<IGetAllFinancialGoalResponse>,
    save: (command: ISaveFinancialGoalCommand) => Promise<ISaveFinancialGoalResponse>,
    deleteFinancialGoal: (command: IDeleteFinancialGoalCommand) => Promise<IDeleteFinancialGoalResponse>,
}