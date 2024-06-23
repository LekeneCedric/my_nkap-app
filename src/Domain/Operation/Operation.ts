import IOperationDto from "./IOperationDto.ts";

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

export type OperationDateItem = {
    totalExpense: number,
    totalIncomes: number,
    date: string,
    operations: IOperationDto[]
}

export interface IOperationFilterParam {
    selectedDate?: Date,
    date?: string,
    formattedDate?: string,
    categoryId?: string,
    categoryLabel?: string,
    categoryIcon?: string,
    operationType?: IOperationTypeEnum,
    typeLabel?: string,
    monthLabel?: string,
    month?: number,
    year?: number,
}
