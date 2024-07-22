export interface IFinancialGoal {
    id: string,
    accountId: string,
    startDate: string,
    endDate: string,
    currentAmount: number,
    desiredAmount: number,
    title?: string,
    createdAt?: Date,
    isComplete?: boolean
}

export enum FinancialGoalStatus {
    PENDING = 'En cours',
    COMPLETE = 'Accompli',
    FAILED = 'Non accompli'
}