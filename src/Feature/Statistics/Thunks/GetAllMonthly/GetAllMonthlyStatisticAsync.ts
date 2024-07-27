import {createAsyncThunk} from "@reduxjs/toolkit";
import {IStatisticsApiGateway} from "../../../../Domain/Statistics/StatisticsApiGateway.ts";
import GetAllMonthlyStatisticsCommand from "./GetAllMonthlyStatisticsCommand.ts";
import GetAllMonthlyStatisticsResponse from "./GetAllMonthlyStatisticsResponse.ts";

const GetAllMonthlyStatisticsAsync = createAsyncThunk<GetAllMonthlyStatisticsResponse, GetAllMonthlyStatisticsCommand>
(
    'statistics/getAllMonthly',
    async(command: GetAllMonthlyStatisticsCommand, thunkAPI: any) => {
        const statisticsApiGatewayHttp: IStatisticsApiGateway = thunkAPI.extra.statisticsApiGatewayHttp;
        try {
            return await statisticsApiGatewayHttp.getAllMonthly(command);
        } catch (error: any) {
            const result: any = {};
            return thunkAPI.rejectWithValue(result);
        }
    }
);
export default GetAllMonthlyStatisticsAsync;