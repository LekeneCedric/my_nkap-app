import { createAsyncThunk } from "@reduxjs/toolkit";
import IAuthenticationApiGateway from "../../../../Domain/Authentication/AuthenticationApiGateway";
import IErrorResult from "../../../IErrorResult";
import ILoginResponse from "./LoginResponse";
import ILoginCommand from "./LoginCommand";

export const LoginAsync = createAsyncThunk<ILoginResponse, ILoginCommand>(
    'authentication/login',
    async (command: ILoginCommand, thunkApi: any) => {
        const authenticationApiGatewayHttp: IAuthenticationApiGateway = thunkApi.extra.authenticationApiGatewayHttp;
        try {
            return await authenticationApiGatewayHttp.login(command);
        } catch (error: any) {
            const result:IErrorResult = {
                message: error.message,
            }
            return thunkApi.rejectWithValue(result);
        }
    }
)