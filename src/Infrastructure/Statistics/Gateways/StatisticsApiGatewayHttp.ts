import {IStatisticsApiGateway} from "../../../Domain/Statistics/StatisticsApiGateway.ts";
import {HttpProvider} from "../../Shared/Gateways/Axios/HttpProvider.ts";
import GetAllMonthlyStatisticsCommand
    from "../../../Feature/Statistics/Thunks/GetAllMonthly/GetAllMonthlyStatisticsCommand.ts";
import GetAllMonthlyStatisticsResponse
    from "../../../Feature/Statistics/Thunks/GetAllMonthly/GetAllMonthlyStatisticsResponse.ts";
import GetAllMonthlyByCategoryStatisticsCommand
    from "../../../Feature/Statistics/Thunks/GetAllMonthlyByCategory/GetAllMonthlyByCategoryStatisticsCommand.ts";
import GetAllMonthlyByCategoryStatisticsResponse
    from "../../../Feature/Statistics/Thunks/GetAllMonthlyByCategory/GetAllMonthlyByCategoryStatisticsResponse.ts";
import {ApiRoutes} from "../../Api/routes";
import QueryBuilder from "../../Shared/Builders/QueryBuilder.ts";

export default class StatisticsApiGatewayHttp extends HttpProvider implements IStatisticsApiGateway {
    /**
     *
     * @param command
     */
    async getAllMonthly(command: GetAllMonthlyStatisticsCommand): Promise<GetAllMonthlyStatisticsResponse> {
        let result: any;
        let query = QueryBuilder.fromCommand(command);

        try {
            const response = await this.get(ApiRoutes.statistics.allMonthly+query);
            //@ts-ignore
            result = response.data;
            console.log('data-m',result.data);
            if (!result.status) {
                throw new Error(result.message)
            }
        } catch (e: any) {
            throw new Error('Une erreur technique est survenue , veuillez réessayer plus-tard');
        }
        return {
           status: result.status,
           data: result.data,
        } as GetAllMonthlyStatisticsResponse
    }

    /**
     *
     * @param command
     */
    async getAllMonthlyByCategory(command: GetAllMonthlyByCategoryStatisticsCommand): Promise<GetAllMonthlyByCategoryStatisticsResponse> {
        let result: any;
        let query = QueryBuilder.fromCommand(command);
        console.log(query);
        try {
            const response = await this.get(ApiRoutes.statistics.allMonthlyCategory+query);
            console.warn(response);
            //@ts-ignore
            result = response.data;
            console.log(result);
            if (!result.status) {
                throw new Error(result.message)
            }
        } catch (e: any) {
            throw new Error('Une erreur technique est survenue , veuillez réessayer plus-tard');
        }
        return {
            status: result.status,
            data: result.data,
        } as GetAllMonthlyByCategoryStatisticsResponse
    }

}