import {IMonthlyStatistic} from "../../../../Domain/Statistics/Statistic.ts";

export default interface GetAllMonthlyStatisticsResponse {
    status: boolean,
    data: IMonthlyStatistic
}