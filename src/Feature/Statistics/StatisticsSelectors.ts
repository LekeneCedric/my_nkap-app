import {RootState} from "../../app/store.ts";

export const selectMonthlyStatistics = (state: RootState) => {
    return state.statisticsReducer.monthlyStats;
}

export const selectMonthlyCategoryByStatistics = (state: RootState) => {
    return state.statisticsReducer.monthlyCategoryStats ? state.statisticsReducer.monthlyCategoryStats : {incomes: [], expenses: []};
}

export const selectStatisticsCurrentMonth = (state: RootState) => {
    return state.statisticsReducer.currentMonth;
}

export const selectStatisticsLoading = (state: RootState) => {
    return state.statisticsReducer.loading;
}