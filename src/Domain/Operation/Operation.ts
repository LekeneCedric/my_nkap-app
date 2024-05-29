export default interface IOperation {
    id: string,
    accountId: string,
    type: IOperationTypeEnum,
    date: string,
    details: string,
    category: string,
    amount: number,
}

export enum IOperationTypeEnum {
    INCOME = 1,
    EXPENSE = 2
}