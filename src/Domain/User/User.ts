export default interface IUser {
    userId: string,
    username: string,
    email: string,
    profession: string,
}

export enum UserStatusEnum {
    PENDING = 'pending',
    ACTIVATE = 'activate',
    DEACTIVATE = 'deactivate'
}