import {createAsyncThunk} from "@reduxjs/toolkit";
import IErrorResult from "../../../IErrorResult.ts";
import ISaveFinancialGoalResponse from "./ISaveFinancialGoalResponse.ts";
import ISaveFinancialGoalCommand from "./ISaveFinancialGoalCommand.ts";
import IFinancialGoalApiGateway from "../../../../Domain/FinancialGoal/FinancialGoalApiGateway.ts";

const SaveFinancialGoalAsync = createAsyncThunk<ISaveFinancialGoalResponse, ISaveFinancialGoalCommand>(
    'financialGoal/save',
    async (command: ISaveFinancialGoalCommand, thunkAPI: any) => {
        const financialGoalApiGateway: IFinancialGoalApiGateway = thunkAPI.extra.financialGoalApiGatewayHttp();

        try {
            return await financialGoalApiGateway.save(command);
        } catch (error: any) {
            const errorResult: IErrorResult = {
                message: error.message,
            }
            return thunkAPI.rejectWithValue(errorResult);
        }
    }
);
export default SaveFinancialGoalAsync;