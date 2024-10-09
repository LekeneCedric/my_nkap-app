import ISendRecoverPasswordCodeResponse from "../../../Feature/Authentication/Thunks/SendRecoverPasswordCode/SendRecoverPasswordCodeResponse";

export default class SendRecoverPasswordCodeResponseFactory {
    static fromApi = (response: any): ISendRecoverPasswordCodeResponse => {
        return {
            status: response.status,
            isSend: response.isSend,
            message: response.message,
        }
    }
}