import { IOperationTypeEnum } from "../../../../Domain/Operation/Operation"

export type OperationProcessingByAI = {
    uuid: string,
    type: IOperationTypeEnum,
    amount: number,
    categoryId: string,
    date: string, //(Y-m-d H:i:s),
    title: string,
    accountId?: string,
}
export default interface IProcessingOperationByAIResponse {
    data: OperationProcessingByAI[]
}