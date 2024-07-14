export interface IFinancialGoal {
    id: string,
    accountId: string,
    startDate: string,
    endDate: string,
    currentAmount: number,
    desiredAmount: number,
    details?: string,
    createdAt?: string,
}