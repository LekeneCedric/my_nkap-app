import IAccount from "../../../Domain/Account/Account";
import { IGetAllAccountResponse } from "../../../Feature/Account/Thunks/GetAll/GetAllAccountResponse";

export default class GetAllAccountCommandFactory {
    static buildFromApiResponse (result: any): IGetAllAccountResponse {
        return {
            status: result.status,
            accounts: result.accounts.map((a: any): IAccount =>{
                return {
                    id: a.accountId,
                    name: a.accountName,
                    type: a.accountType,
                    totalIncomes: parseInt(a.totalIncomes),
                    totalExpenses: parseInt(a.totalExpenses),
                    balance: parseInt(a.accountBalance),
                    isIncludeInTotalBalance: a.isIncludeInTotalBalance,
                    color: a.accountColor,
                    icon: a.accountIcon
                }
            })
        }
    }
}