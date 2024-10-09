import IVerificationAccountResponse from "../../../Feature/Authentication/Thunks/VerificationAccount/VerificationAccountResponse";

export default class VerificationAccountResponseFactory {
    static fromApi = (response: any): IVerificationAccountResponse => {
        return {
            message: response.message,
            accountVerified: response.accountVerified
        }
    }
}