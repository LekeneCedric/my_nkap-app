import { createAsyncThunk } from "@reduxjs/toolkit";
import IVerificationAccountResponse from "./VerificationAccountResponse";
import IVerificationAccountCommand from "./VerificationAccountCommand";
import IAuthenticationApiGateway from "../../../../Domain/Authentication/AuthenticationApiGateway";
import IErrorResult from "../../../IErrorResult";

const VerificationAccountAsync = createAsyncThunk<IVerificationAccountResponse, IVerificationAccountCommand>(
    'auth/verification-account',
    async (command: IVerificationAccountCommand, thunkApi: any) => {
        const authenticationApiGatewayHttp: IAuthenticationApiGateway = thunkApi.extra.authenticationApiGatewayHttp;
        try {
            return await authenticationApiGatewayHttp.verificationAccount(command);
        } catch (error: any) {
            const result:IErrorResult = {
                message: error.message,
            }
            return thunkApi.rejectWithValue(result);
        }
    }
);

export default VerificationAccountAsync;