import IAuthenticationApiGateway from "../../../Domain/Authentication/AuthenticationApiGateway";
import ILoginCommand from "../../../Feature/Authentication/Thunks/Login/LoginCommand";
import ILoginResponse from "../../../Feature/Authentication/Thunks/Login/LoginResponse";
import { IRegisterCommand } from "../../../Feature/Authentication/Thunks/Register/RegisterCommand";
import IRegisterResponse from "../../../Feature/Authentication/Thunks/Register/RegisterResponse";
import { ApiRoutes } from "../../Api/routes";
import { HttpProvider } from "../../Shared/gateways/Axios/HttpProvider";
import LoginResponseFactory from "../Factories/LoginResponseFactory";
import RegisterResponseFactory from "../Factories/RegisterResponseFactory";

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
            throw new Error(e.message ? e.message : 'Une erreur technique est survenue , veuillez reessayer plus-tard');
        }

        return RegisterResponseFactory.fromApi(result);
    };

    async login (command: ILoginCommand): Promise<ILoginResponse> {
        let result: any;

        try{
            const response = await this.post(ApiRoutes.authentication.login, command);
            //@ts-ignore
            result = response.data;
            console.warn(result)
            if (!result.status) {
                throw new Error(result.message);
            } 
        } catch (e: any) {
            throw new Error(e.message ? e.message : 'Une erreur technique est survenue , veuillez reessayer plus-tard');
        }

        return LoginResponseFactory.fromApi(result);
    }

}