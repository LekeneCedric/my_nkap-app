import {IMonthlyCategoryStatistic} from "../../../../Domain/Statistics/Statistic.ts";

export default interface GetAllMonthlyByCategoryStatisticsResponse {
    status: boolean,
    data: IMonthlyCategoryStatistic
}