export default interface FinancialGoalForm {
    financialGoalId?: string,
    userId: string,
    accountId: string,
    startDate: string,
    endDate: string,
    desiredAmount: number,
    details: string,
}