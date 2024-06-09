export default interface IOperation {
    id?: string,
    accountId: string,
    type: IOperationTypeEnum,
    categoryId: string,
    date: string,
    detail: string,
    amount: number,
}

export enum IOperationTypeEnum {
    INCOME = 1,
    EXPENSE = 2
}