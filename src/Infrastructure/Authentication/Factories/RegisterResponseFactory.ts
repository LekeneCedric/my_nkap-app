import IRegisterResponse from "../../../Feature/Authentication/Thunks/Register/RegisterResponse";

export default class RegisterResponseFactory {
    static fromApi = (response: any): IRegisterResponse => {
        return {
            status: response.status,
            isCreated: response.isCreated,
            message: response.message,
            token: response.token,
            user: {
                userId: response.user.userId,
                username: response.user.username,
                email: response.user.email,
                profession: response.user.profession,
            },
            aiToken: response.aiToken,
        } as IRegisterResponse
    }
}