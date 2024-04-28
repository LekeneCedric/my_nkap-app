import { createAsyncThunk } from "@reduxjs/toolkit";
import IRegisterResponse from "./RegisterResponse";
import { IRegisterCommand } from "./RegisterCommand";
import IAuthenticationApiGateway from "../../../../Domain/Authentication/AuthenticationApiGateway";
import IErrorResult from "../../../IErrorResult";

export const RegisterAsync = createAsyncThunk<IRegisterResponse, IRegisterCommand>(
    'authentication/register',
    async(registerCommand: IRegisterCommand, thunkApi: any) => {
        const authenticationApiGatewayHttp: IAuthenticationApiGateway = thunkApi.extra.authenticationApiGatewayHttp;
        try {
            return await authenticationApiGatewayHttp.register(registerCommand)
        } catch ( error: any) {
            const result:IErrorResult = {
                message: error.message,
            };
            return thunkApi.rejectWithValue(result);
        }
    }
)