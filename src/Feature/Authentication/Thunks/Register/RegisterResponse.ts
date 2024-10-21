import IUser from "../../../../Domain/User/User";

export default interface IRegisterResponse {
    status: boolean,
    isCreated: boolean,
    message: string,
    token: string,
    user: IUser,
    aiToken: number,
}