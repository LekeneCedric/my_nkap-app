import IUser from "../../../../Domain/User/User";

export default interface ILoginResponse {
    status: boolean,
    isLogged: boolean,
    user: IUser,
    token: string,
    message: string,
    aiToken: number
}