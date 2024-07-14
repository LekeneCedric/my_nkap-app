export default interface ISaveFinancialGoalResponse {
    status: boolean,
    isMake: boolean,
    message: string,
    createdAt?: string,
    financialGoalId?: string,
}