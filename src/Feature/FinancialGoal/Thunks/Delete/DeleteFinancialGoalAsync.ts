import {createAsyncThunk} from "@reduxjs/toolkit";
import IFinancialGoalApiGateway from "../../../../Domain/FinancialGoal/FinancialGoalApiGateway.ts";
import IErrorResult from "../../../IErrorResult.ts";
import IDeleteFinancialGoalResponse from "./DeleteFinancialGoalResponse.ts";
import IDeleteFinancialGoalCommand from "./DeleteFinancialGoalCommand.ts";

const DeleteFinancialGoalAsync = createAsyncThunk<
    IDeleteFinancialGoalResponse, IDeleteFinancialGoalCommand>(
    'financialGoal/delete',
    async (command: IDeleteFinancialGoalCommand, thunkAPI: any) => {
        const financialGoalApiGatewayHttp: IFinancialGoalApiGateway = thunkAPI.extra.financialGoalApiGatewayHttp;
        try {
            return await financialGoalApiGatewayHttp.deleteFinancialGoal(command);
        } catch (error: any) {
            const errorResult: IErrorResult = {
                message: error.message,
            }
            return thunkAPI.rejectWithValue(errorResult);
        }
    }
);
export default DeleteFinancialGoalAsync;