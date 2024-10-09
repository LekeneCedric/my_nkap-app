import IAuthenticationApiGateway from "../../../Domain/Authentication/AuthenticationApiGateway";
import ILoginCommand from "../../../Feature/Authentication/Thunks/Login/LoginCommand";
import ILoginResponse from "../../../Feature/Authentication/Thunks/Login/LoginResponse";
import IRecoverPasswordCommand from "../../../Feature/Authentication/Thunks/RecoverPassword/RecoverPasswordCommand";
import IRecoverPasswordResponse from "../../../Feature/Authentication/Thunks/RecoverPassword/RecoverPasswordResponse";
import { IRegisterCommand } from "../../../Feature/Authentication/Thunks/Register/RegisterCommand";
import IRegisterResponse from "../../../Feature/Authentication/Thunks/Register/RegisterResponse";
import ISendRecoverPasswordCodeCommand from "../../../Feature/Authentication/Thunks/SendRecoverPasswordCode/SendRecoverPasswordCodeCommand";
import ISendRecoverPasswordCodeResponse from "../../../Feature/Authentication/Thunks/SendRecoverPasswordCode/SendRecoverPasswordCodeResponse";
import IVerificationAccountCommand from "../../../Feature/Authentication/Thunks/VerificationAccount/VerificationAccountCommand";
import IVerificationAccountResponse from "../../../Feature/Authentication/Thunks/VerificationAccount/VerificationAccountResponse";
import { ApiRoutes } from "../../Api/routes";
import { HttpProvider } from "../../Shared/Gateways/Axios/HttpProvider";
import LoginResponseFactory from "../Factories/LoginResponseFactory";
import RecoverPasswordResponseFactory from "../Factories/RecoverPasswordResponseFactory";
import RegisterResponseFactory from "../Factories/RegisterResponseFactory";
import SendRecoverPasswordCodeResponseFactory from "../Factories/SendRecoverPasswordCodeResponseFactory";
import VerificationAccountResponseFactory from "../Factories/VerificationAccountResponseFactory";

export default class AuthenticationApiGatewayHttp extends HttpProvider implements IAuthenticationApiGateway {
    async register (command: IRegisterCommand): Promise<IRegisterResponse> {
        let result: any;

        try {
            const response = await this.post(ApiRoutes.authentication.register, command);
            //@ts-ignore
            result = response.data;
            if (!result.status) {
                throw new Error(result.message);
            }
        } catch (e: any) {
            throw new Error(e.message ? e.message : 'technical_error_message');
        }

        return RegisterResponseFactory.fromApi(result);
    };

    async login (command: ILoginCommand): Promise<ILoginResponse> {
        let result: any;

        try{
            const response = await this.post(ApiRoutes.authentication.login, command);
            //@ts-ignore
            result = response.data;
            if (!result.status) {
                throw new Error(result.message);
            } 
        } catch (e: any) {
            throw new Error(e.message ? e.message : 'technical_error_message');
        }

        return LoginResponseFactory.fromApi(result);
    }

    async sendRecoverPasswordCode (command: ISendRecoverPasswordCodeCommand): Promise<ISendRecoverPasswordCodeResponse> {
        let result: any;
        
        try {
            const response = await this.post(ApiRoutes.authentication.sendRecoverPasswordCode, command);
            //@ts-ignore
            result = response.data;
            if (!result.status) {
                throw new Error(result.message);
            }
        } catch (e: any) {
            throw new Error(e.message ? e.message : 'technical_error_message');
        }

        return SendRecoverPasswordCodeResponseFactory.fromApi(result);
    }

    async recoverPassword (command: IRecoverPasswordCommand): Promise<IRecoverPasswordResponse> {
        let result: any;

        try{
            const response = await this.post(ApiRoutes.authentication.recoverpassword, command);
            //@ts-ignore
            result = response.data;
            console.warn(result);
            if (!result.status) {
                throw new Error(result.message);
            }
        } catch (e: any) {
            throw new Error(e.message ? e.message : 'technical_error_message');
        }

        return RecoverPasswordResponseFactory.fromApi(result);
    }

    async verificationAccount (command: IVerificationAccountCommand): Promise<IVerificationAccountResponse> {
        let result: any;

        try {
            const response = await this.post(ApiRoutes.authentication.verification_account, command);
            //@ts-ignore :(
            result = response.data;
            console.warn(result);
            if (!result.status) {
                throw new Error(result.message);
            }
        } catch (e: any) {
            throw new Error(e.message ? e.message : 'technical_error_message');
        }

        return VerificationAccountResponseFactory.fromApi(result);
    }


}