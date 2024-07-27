import {createAsyncThunk} from "@reduxjs/toolkit";
import {IStatisticsApiGateway} from "../../../../Domain/Statistics/StatisticsApiGateway.ts";
import GetAllMonthlyByCategoryStatisticsResponse from "./GetAllMonthlyByCategoryStatisticsResponse.ts";
import GetAllMonthlyByCategoryStatisticsCommand from "./GetAllMonthlyByCategoryStatisticsCommand.ts";

const GetAllMonthlyByCategoryStatisticsAsync = createAsyncThunk<
    GetAllMonthlyByCategoryStatisticsResponse,
    GetAllMonthlyByCategoryStatisticsCommand
>(
    'statistics/getAllMonthlyByCategory',
    async(command: GetAllMonthlyByCategoryStatisticsCommand, thunkAPI: any) => {
        const statisticsApiGatewayHttp: IStatisticsApiGateway = thunkAPI.extra.statisticsApiGatewayHttp;
        try {
            return await statisticsApiGatewayHttp.getAllMonthlyByCategory(command);
        } catch (error: any) {
            const result: any = {};
            return thunkAPI.rejectWithValue(result);
        }
    }
);

export default GetAllMonthlyByCategoryStatisticsAsync;