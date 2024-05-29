import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGetAllAccountResponse } from "./GetAllAccountResponse";
import { IGetAllAccountCommand } from "./GetAllAccountCommand";
import IAccountApiGateway from "../../../../Domain/Account/AccountApiGateway";
import IErrorResult from "../../../IErrorResult";

export const GetAllAccountAsync = createAsyncThunk<IGetAllAccountResponse, IGetAllAccountCommand>(
    'accounts/all',
    async (command: IGetAllAccountCommand, thunkApi: any) => {
        const accountApiGatewayHttp: IAccountApiGateway = thunkApi.extra.accountApiGatewayHttp;
        try {
            return await accountApiGatewayHttp.getAll(command);
        } catch (error: any) {
            const result: IErrorResult = {
                message: error.message
            }
            return thunkApi.rejectWithValue(result)
        }
    }
)