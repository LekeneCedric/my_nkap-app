import IOperationApiGateway from "../../../Domain/Operation/OperationApiGateway.ts";
import {HttpProvider} from "../../Shared/Gateways/Axios/HttpProvider.ts";
import IFilterOperationsCommand from "../../../Feature/Operations/Thunks/Filter/FilterOperationsCommand.ts";
import IFilterOperationsResponse from "../../../Feature/Operations/Thunks/Filter/FilterOperationsResponse.ts";
import {ApiRoutes} from "../../Api/routes";
import gatewayMessages from "../../Shared/Gateways/constants/gatewayMessages.ts";
import FilterOperationsResponseFactory from "../Factories/FilterOperationsResponseFactory.ts";
import ISaveOperationCommand from "../../../Feature/Operations/Thunks/Save/SaveOperationCommand.ts";
import ISaveOperationResponse from "../../../Feature/Operations/Thunks/Save/SaveOperationResponse.ts";
import SaveOperationsResponseFactory from "../Factories/SaveOperationsResponseFactory.ts";
import FilterOperationCommandBuilder from "../Builder/FilterOperationCommandBuilder.ts";

export default class OperationsApiGatewayHttp extends HttpProvider implements IOperationApiGateway {

    async filter (command: IFilterOperationsCommand) : Promise<IFilterOperationsResponse> {
        let result: any;
        const finalCommand = FilterOperationCommandBuilder.asCommand()
            .withPage(command.page)
            .withLimit(command.limit)
            .withUserId(command.userId)
            .withDate(command.filterParams.date)
            .withCategoryId(command.filterParams.categoryId)
            .withType(command.filterParams.type)
            .build();
        console.warn(finalCommand);

        try {
            const response = await this.post(ApiRoutes.operations.filter, finalCommand);
            //@ts-ignore
            result = response.data;
            if (!result.status) {
                throw new Error(result.message);
            }
        } catch (e: any) {
            console.warn('error',e.message);
            throw new Error(e.message ? e.message : gatewayMessages.technicalError);
        }

        return FilterOperationsResponseFactory.buildFromApiResponse(result);
    }

    async save(command: ISaveOperationCommand): Promise<ISaveOperationResponse> {
        let result: any;
        try {
            const response = await this.post(ApiRoutes.operations.save, command);
            //@ts-ignore
            result = response.data;
            if (!result.status || !result.operationSaved) {
                throw new Error(result.message);
            }
        } catch (e: any) {
            throw new Error(e.message ? e.message : gatewayMessages.technicalError);
        }
        return SaveOperationsResponseFactory.buildFromApiResponse(result);
    }
}