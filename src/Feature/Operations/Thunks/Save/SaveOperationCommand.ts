export default interface ISaveOperationCommand {
    accountId: string,
    operationId?: string,
    type: number,
    amount: number,
    categoryId: string,
    date: string
    detail?: string,
    previousAmount?: number,
}