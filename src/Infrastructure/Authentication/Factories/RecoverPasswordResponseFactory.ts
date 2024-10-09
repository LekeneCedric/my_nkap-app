import IRecoverPasswordResponse from "../../../Feature/Authentication/Thunks/RecoverPassword/RecoverPasswordResponse";

export default class RecoverPasswordResponseFactory {
    static fromApi = (response: any): IRecoverPasswordResponse => {
        return {
            passwordReset: response.passwordReset,
        }
    }
}