import {createAsyncThunk} from "@reduxjs/toolkit";
import IFinancialGoalApiGateway from "../../../../Domain/FinancialGoal/FinancialGoalApiGateway.ts";
import IErrorResult from "../../../IErrorResult.ts";
import IGetAllFinancialGoalResponse from "./GetAllFinancialGoalResponse.ts";
import IGetAllFinancialGoalCommand from "./GetAllFinancialGoalCommand.ts";

const GetAllFinancialGoalAsync = createAsyncThunk <IGetAllFinancialGoalResponse, IGetAllFinancialGoalCommand>(
    'financialGoal/getAll',
    async (command: IGetAllFinancialGoalCommand, thunkAPI: any) => {
        const financialGoalApiGateway: IFinancialGoalApiGateway = thunkAPI.extra.financialGoalApiGatewayHttp;
        try {
            return await financialGoalApiGateway.getAll(command);
        } catch (error: any) {
            const errorResult: IErrorResult = {
                message: error.message,
            }
            return thunkAPI.rejectWithValue(errorResult);
        }
    }
);
export default GetAllFinancialGoalAsync;