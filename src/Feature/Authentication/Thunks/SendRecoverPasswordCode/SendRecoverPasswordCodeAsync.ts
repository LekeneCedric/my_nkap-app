import { createAsyncThunk } from "@reduxjs/toolkit";
import ISendRecoverPasswordCodeResponse from "./SendRecoverPasswordCodeResponse";
import ISendRecoverPasswordCodeCommand from "./SendRecoverPasswordCodeCommand";
import IAuthenticationApiGateway from "../../../../Domain/Authentication/AuthenticationApiGateway";
import IErrorResult from "../../../IErrorResult";

const SendRecoverPasswordCodeAsync = createAsyncThunk<ISendRecoverPasswordCodeResponse, ISendRecoverPasswordCodeCommand>(
    'authentication/recover-code',
    async(command: ISendRecoverPasswordCodeCommand, thunkApi: any) => {
        const authenticationApiGatewayHttp: IAuthenticationApiGateway = thunkApi.extra.authenticationApiGatewayHttp;
        try {
            return await authenticationApiGatewayHttp.sendRecoverPasswordCode(command);
        } catch (error: any) {
            const result:IErrorResult = {
                message: error.message,
            }
            return thunkApi.rejectWithValue(result);
        }
    }
);
export default SendRecoverPasswordCodeAsync;