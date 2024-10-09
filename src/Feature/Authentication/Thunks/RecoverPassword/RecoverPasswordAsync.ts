import { createAsyncThunk } from "@reduxjs/toolkit";
import IRecoverPasswordResponse from "./RecoverPasswordResponse";
import IRecoverPasswordCommand from "./RecoverPasswordCommand";
import IAuthenticationApiGateway from "../../../../Domain/Authentication/AuthenticationApiGateway";
import IErrorResult from "../../../IErrorResult";

const RecoverPasswordAsync = createAsyncThunk<IRecoverPasswordResponse, IRecoverPasswordCommand>(
    'authentication/recover-password',
    async(command: IRecoverPasswordCommand, thunkApi: any) => {
        const authenticationApiGatewayHttp: IAuthenticationApiGateway = thunkApi.extra.authenticationApiGatewayHttp;
        try {
            return await authenticationApiGatewayHttp.recoverPassword(command);
        } catch (error: any) {
            const result:IErrorResult = {
                message: error.message,
            }
            return thunkApi.rejectWithValue(result);
        } 
    }
);
export default RecoverPasswordAsync;