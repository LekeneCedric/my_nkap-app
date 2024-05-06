import IAccount from "../../../../Domain/Account/Account";

export interface IGetAllAccountResponse {
    status: boolean,
    accounts: IAccount[],
}