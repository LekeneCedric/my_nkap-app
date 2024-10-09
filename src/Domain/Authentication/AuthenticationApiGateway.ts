import ILoginCommand from "../../Feature/Authentication/Thunks/Login/LoginCommand";
import ILoginResponse from "../../Feature/Authentication/Thunks/Login/LoginResponse";
import ISendRecoverPasswordCodeResponse from "../../Feature/Authentication/Thunks/SendRecoverPasswordCode/SendRecoverPasswordCodeResponse";
import ISendRecoverPasswordCodeCommand from "../../Feature/Authentication/Thunks/SendRecoverPasswordCode/SendRecoverPasswordCodeCommand";
import { IRegisterCommand } from "../../Feature/Authentication/Thunks/Register/RegisterCommand";
import IRegisterResponse from "../../Feature/Authentication/Thunks/Register/RegisterResponse";
import IRecoverPasswordCommand from "../../Feature/Authentication/Thunks/RecoverPassword/RecoverPasswordCommand";
import IRecoverPasswordResponse from "../../Feature/Authentication/Thunks/RecoverPassword/RecoverPasswordResponse";
import IVerificationAccountCommand from "../../Feature/Authentication/Thunks/VerificationAccount/VerificationAccountCommand";
import IVerificationAccountResponse from "../../Feature/Authentication/Thunks/VerificationAccount/VerificationAccountResponse";

export default interface IAuthenticationApiGateway {
    login: (command: ILoginCommand) => Promise<ILoginResponse>;
    register: (command: IRegisterCommand) => Promise<IRegisterResponse>;
    sendRecoverPasswordCode: (command: ISendRecoverPasswordCodeCommand) => Promise<ISendRecoverPasswordCodeResponse>;
    recoverPassword: (command: IRecoverPasswordCommand) => Promise<IRecoverPasswordResponse>;
    verificationAccount: (command: IVerificationAccountCommand) => Promise<IVerificationAccountResponse>;
}