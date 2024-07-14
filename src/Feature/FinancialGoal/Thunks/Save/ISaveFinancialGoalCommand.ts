export default interface ISaveFinancialGoalCommand {
    financialGoalId?: string,
    userId: string,
    accountId: string,
    startDate: string,
    endDate: string,
    desiredAmount: string,
    details: string,
}