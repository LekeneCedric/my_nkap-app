import ISaveFinancialGoalCommand from "../../Feature/FinancialGoal/Thunks/Save/ISaveFinancialGoalCommand.ts";
import ISaveFinancialGoalResponse from "../../Feature/FinancialGoal/Thunks/Save/ISaveFinancialGoalResponse.ts";

export default interface IFinancialGoalApiGateway {
    save: (command: ISaveFinancialGoalCommand) => Promise<ISaveFinancialGoalResponse>,
}