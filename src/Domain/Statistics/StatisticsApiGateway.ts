import GetAllMonthlyStatisticsResponse
    from "../../Feature/Statistics/Thunks/GetAllMonthly/GetAllMonthlyStatisticsResponse.ts";
import GetAllMonthlyStatisticsCommand
    from "../../Feature/Statistics/Thunks/GetAllMonthly/GetAllMonthlyStatisticsCommand.ts";
import GetAllMonthlyByCategoryStatisticsCommand
    from "../../Feature/Statistics/Thunks/GetAllMonthlyByCategory/GetAllMonthlyByCategoryStatisticsCommand.ts";
import GetAllMonthlyByCategoryStatisticsResponse
    from "../../Feature/Statistics/Thunks/GetAllMonthlyByCategory/GetAllMonthlyByCategoryStatisticsResponse.ts";

export interface IStatisticsApiGateway {
    getAllMonthly: (command: GetAllMonthlyStatisticsCommand) => Promise<GetAllMonthlyStatisticsResponse>;
    getAllMonthlyByCategory: (command: GetAllMonthlyByCategoryStatisticsCommand) => Promise<GetAllMonthlyByCategoryStatisticsResponse>;
}