import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoadingState} from "../../../Domain/Enums/LoadingState.ts";
import {IMonthlyCategoryStatistic, IMonthlyStatistic} from "../../../Domain/Statistics/Statistic.ts";
import GetAllMonthlyStatisticAsync from "./GetAllMonthly/GetAllMonthlyStatisticAsync.ts";
import GetAllMonthlyStatisticsAsync from "./GetAllMonthly/GetAllMonthlyStatisticAsync.ts";
import GetAllMonthlyStatisticsResponse from "./GetAllMonthly/GetAllMonthlyStatisticsResponse.ts";
import GetAllMonthlyByCategoryStatisticsAsync from "./GetAllMonthlyByCategory/GetAllMonthlyBycategoryStatisticAsync.ts";
import GetAllMonthlyByCategoryStatisticAsync from "./GetAllMonthlyByCategory/GetAllMonthlyBycategoryStatisticAsync.ts";
import GetAllMonthlyByCategoryStatisticsResponse
    from "./GetAllMonthlyByCategory/GetAllMonthlyByCategoryStatisticsResponse.ts";

type initialStateType = {
    loading: LoadingState,
    monthlyStats?: IMonthlyStatistic,
    monthlyCategoryStats?: IMonthlyCategoryStatistic,
}
const initialState: initialStateType = {
    loading: LoadingState.idle,

}
export const StatisticsSlice = createSlice({
    name: 'statistics',
    initialState: initialState,
    reducers: {},
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

export const {} = StatisticsSlice.actions;
export default StatisticsSlice.reducer;