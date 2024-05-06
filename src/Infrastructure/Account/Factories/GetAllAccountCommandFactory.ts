import { IGetAllAccountResponse } from "../../../Feature/Account/Thunks/GetAll/GetAllAccountResponse";

export default class GetAllAccountCommandFactory {
    static buildFromApi (result: any): IGetAllAccountResponse {
        return {
            status: result.status,
            accounts: result.accounts
        }
    }
}