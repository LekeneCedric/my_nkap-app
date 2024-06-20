import {IOperationTypeEnum} from "../../../../Domain/Operation/Operation.ts";

export default interface AddOperationForm {
    operationId?: string,
    accountId: string,
    type: IOperationTypeEnum,
    amount: number,
    categoryId: string,
    date: string,
    details?: string,
}