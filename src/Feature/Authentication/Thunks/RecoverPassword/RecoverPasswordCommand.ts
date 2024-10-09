export default interface IRecoverPasswordCommand {
    code: string,
    email: string,
    password: string,
}