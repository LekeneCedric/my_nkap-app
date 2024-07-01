import {createAsyncThunk} from "@reduxjs/toolkit";
import IAccountApiGateway from "../../../../Domain/Account/AccountApiGateway.ts";
import IErrorResult from "../../../IErrorResult.ts";
import DeleteAccountResponse from "./DeleteAccountResponse.ts";
import DeleteAccountCommand from "./DeleteAccountCommand.ts";

const DeleteAccountAsync = createAsyncThunk<DeleteAccountResponse, DeleteAccountCommand>(
    'account/delete',
    async (command: DeleteAccountCommand, thunkAPI: any) => {
        const accountApiGatewayHttp: IAccountApiGateway = thunkAPI.extra.accountApiGatewayHttp;
        try {
            return await accountApiGatewayHttp.deleteAccount(command);
        } catch (error: any) {
            const result: IErrorResult = {
                message: error.message
            }
            return thunkAPI.rejectWithValue(result)
        }
    }
);
export default DeleteAccountAsync;