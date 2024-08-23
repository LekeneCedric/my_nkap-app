import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoadingState} from "../../Domain/Enums/LoadingState.ts";
import {IMonthlyCategoryStatistic, IMonthlyStatistic} from "../../Domain/Statistics/Statistic.ts";
import GetAllMonthlyStatisticAsync from "./Thunks/GetAllMonthly/GetAllMonthlyStatisticAsync.ts";
import GetAllMonthlyStatisticsAsync from "./Thunks/GetAllMonthly/GetAllMonthlyStatisticAsync.ts";
import GetAllMonthlyStatisticsResponse from "./Thunks/GetAllMonthly/GetAllMonthlyStatisticsResponse.ts";
import GetAllMonthlyByCategoryStatisticsAsync from "./Thunks/GetAllMonthlyByCategory/GetAllMonthlyBycategoryStatisticAsync.ts";
import GetAllMonthlyByCategoryStatisticAsync from "./Thunks/GetAllMonthlyByCategory/GetAllMonthlyBycategoryStatisticAsync.ts";
import GetAllMonthlyByCategoryStatisticsResponse
    from "./Thunks/GetAllMonthlyByCategory/GetAllMonthlyByCategoryStatisticsResponse.ts";

type initialStateType = {
    loading: LoadingState,
    monthlyStats?: IMonthlyStatistic,
    monthlyCategoryStats?: IMonthlyCategoryStatistic,
    currentMonth: number,
}
const initialState: initialStateType = {
    loading: LoadingState.idle,
    currentMonth: new Date().getMonth() + 1,
}
export const StatisticsSlice = createSlice({
    name: 'statistics',
    initialState: initialState,
    reducers: {
        handleNextMonth: (state) => {
            console.warn(state.currentMonth);
            if (state.currentMonth < 12) {
                state.currentMonth = state.currentMonth + 1;
            }
        },
        handlePreviousMonth: (state) => {
            console.warn(state.currentMonth);
            if (state.currentMonth > 1) {
                state.currentMonth = state.currentMonth - 1;
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(GetAllMonthlyStatisticAsync.pending, state => {
                state.loading = LoadingState.pending;
            })
            .addCase(GetAllMonthlyStatisticsAsync.rejected, state => {
                state.loading = LoadingState.failed;
            })
            .addCase(GetAllMonthlyStatisticAsync.fulfilled, (state, {payload}: PayloadAction<GetAllMonthlyStatisticsResponse>) => {
                state.loading = LoadingState.success;
                state.monthlyStats = payload.data;
            });
        builder
            .addCase(GetAllMonthlyByCategoryStatisticsAsync.pending, state => {
                state.loading = LoadingState.pending;
            })
            .addCase(GetAllMonthlyByCategoryStatisticAsync.rejected, state => {
                state.loading = LoadingState.failed;
            })
            .addCase(GetAllMonthlyByCategoryStatisticsAsync.fulfilled, (state, {payload}: PayloadAction<GetAllMonthlyByCategoryStatisticsResponse>) => {
                state.loading = LoadingState.success;
                state.monthlyCategoryStats = payload.data;
            });
    }
});

export const {
    handleNextMonth, handlePreviousMonth
} = StatisticsSlice.actions;
export default StatisticsSlice.reducer;