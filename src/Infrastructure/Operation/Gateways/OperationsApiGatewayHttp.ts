import IOperationApiGateway from "../../../Domain/Operation/OperationApiGateway.ts";
import {HttpProvider} from "../../Shared/gateways/Axios/HttpProvider.ts";
import IFilterOperationsCommand from "../../../Feature/Operations/Thunks/Filter/FilterOperationsCommand.ts";
import IFilterOperationsResponse from "../../../Feature/Operations/Thunks/Filter/FilterOperationsResponse.ts";
import {ApiRoutes} from "../../Api/routes";
import gatewayMessages from "../../Shared/gateways/constants/gatewayMessages.ts";
import FilterOperationsResponseFactory from "../Factories/FilterOperationsResponseFactory.ts";

export default class OperationsApiGatewayHttp extends HttpProvider implements IOperationApiGateway {

    async filter (command: IFilterOperationsCommand) : Promise<IFilterOperationsResponse> {
        let result: any;
        console.warn(command);
        try {
            const response = await this.post(ApiRoutes.operations.filter, command);
            //@ts-ignore
            result = response.data;
            console.warn('result',result);
            if (!result.status) {
                throw new Error(result.message);
            }
        } catch (e: any) {
            console.warn('error',e.message);
            throw new Error(e.message ? e.message : gatewayMessages.technicalError);
        }

        return FilterOperationsResponseFactory.buildFromApiResponse(result);
    }
}