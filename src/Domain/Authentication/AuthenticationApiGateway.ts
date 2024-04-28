import ILoginCommand from "../../Feature/Authentication/Thunks/Login/LoginCommand";
import ILoginResponse from "../../Feature/Authentication/Thunks/Login/LoginResponse";
import { IRegisterCommand } from "../../Feature/Authentication/Thunks/Register/RegisterCommand";
import IRegisterResponse from "../../Feature/Authentication/Thunks/Register/RegisterResponse";

export default interface IAuthenticationApiGateway {
    login: (command: ILoginCommand) => Promise<ILoginResponse>;
    register: (command: IRegisterCommand) => Promise<IRegisterResponse>;
}