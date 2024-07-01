import {createAsyncThunk} from "@reduxjs/toolkit";
import IAccountApiGateway from "../../../../Domain/Account/AccountApiGateway.ts";
import IErrorResult from "../../../IErrorResult.ts";
import ISaveAccountCommand from "./SaveAccountCommand.ts";
import ISaveAccountResponse from "./SaveAccountResponse.ts";

export const SaveAccountAsync = createAsyncThunk<ISaveAccountResponse, ISaveAccountCommand>(
    'accounts/save',
    async(command: ISaveAccountCommand, thunkAPI: any) => {
        const accountApiGatewayHttp: IAccountApiGateway = thunkAPI.extra.accountApiGatewayHttp;
        try {
            return await accountApiGatewayHttp.save(command);
        } catch (error: any) {
            const result: IErrorResult = {
                message: error.message
            }
            return thunkAPI.rejectWithValue(result)
        }
    }
);