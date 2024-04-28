import ILoginResponse from "../../../Feature/Authentication/Thunks/Login/LoginResponse"

export default class LoginResponseFactory {
    static fromApi = (response: any): ILoginResponse => {
        return {
           status: response.status,
           isLogged: response.isLogged,
           user: response.user,
           token: response.token,
           message: response.message,
        } as ILoginResponse
    }
}