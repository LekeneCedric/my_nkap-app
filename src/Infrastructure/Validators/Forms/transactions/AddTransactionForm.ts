import {IOperationTypeEnum} from "../../../../Domain/Operation/Operation.ts";

export default interface AddTransactionForm {
    accountId: string,
    amount: number,
    type: IOperationTypeEnum,
    categoryId: string,
    details: string,
}