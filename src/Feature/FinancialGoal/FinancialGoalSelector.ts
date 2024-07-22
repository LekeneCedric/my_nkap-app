import {RootState} from "../../app/store.ts";
import {FinancialGoalStatus} from "../../Domain/FinancialGoal/FinancialGoal.ts";

export const selectFinancialGoals = (state: RootState) => {
    return state.financialGoalReducer.financialGoals;
};

export const selectFinancialGoalsLoadingState = (state: RootState) => {
    return state.financialGoalReducer.loadingState;
}

export const selectFinancialGoalStatus = (financialGoalId: string) => (state: RootState): FinancialGoalStatus => {
    const financialGoal = state.financialGoalReducer.financialGoals.find(f => f.id === financialGoalId)!;
    const today = new Date();
    const endDate = new Date(financialGoal.endDate);
    let financialGoalDateHasPassed = today.getTime() > endDate.getTime();
    let financialGoalHasNotBeenReached = financialGoal.currentAmount < financialGoal.desiredAmount;
    if (financialGoalDateHasPassed && financialGoalHasNotBeenReached) {
        return FinancialGoalStatus.FAILED;
    }
    if (financialGoal.isComplete) {
        return FinancialGoalStatus.COMPLETE;
    }
    return FinancialGoalStatus.PENDING;
}

export const selectFinancialGoalPercentage = (financialGoalId: string) => (state: RootState): number => {
    const financialGoal = state.financialGoalReducer.financialGoals.find(f => f.id === financialGoalId)!;
    const percentage = (financialGoal.currentAmount * 100) / financialGoal.desiredAmount;
    if (percentage > 100)
        return 100;
    if (percentage >= 0 && percentage <= 100)
        return parseInt(String(percentage));
    return 0;
}