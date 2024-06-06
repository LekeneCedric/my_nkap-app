import {HttpProvider} from "../../Shared/Gateways/Axios/HttpProvider.ts";
import IGetAllCategoryCommand from "../../../Feature/Category/Thunks/GetAll/GetAllCategoryCommand.ts";
import IGetAllCategoryResponse from "../../../Feature/Category/Thunks/GetAll/GetAllCategoryResponse.ts";
import {ApiRoutes} from "../../Api/routes";
import GetAllCategoryResponseFactory from "../Factories/GetAllCategoryResponseFactory.ts";
import ICategoryApiGateway from "../../../Domain/Category/CategoryApiGateway.ts";
import ISaveCategoryCommand from "../../../Feature/Category/Thunks/Save/SaveCategoryCommand.ts";
import ISaveCategoryResponse from "../../../Feature/Category/Thunks/Save/SaveCategoryResponse.ts";
import GatewayMessages from "../../Shared/Gateways/constants/gatewayMessages.ts";
import SaveCategoryResponseFactory from "../Factories/SaveCategoryResponseFactory.ts";

export default class CategoryApiGatewayHttp extends HttpProvider implements ICategoryApiGateway {
    async getAll(command: IGetAllCategoryCommand): Promise<IGetAllCategoryResponse> {
        let result: any

        try {
            const response = await this.get(ApiRoutes.category.all(command.userId));
            //@ts-ignore
            result = response.data;
            if (!result.status) {
                throw new Error(result.messages);
            }
        } catch (e: any) {
            throw new Error(e.message ? e.message : GatewayMessages.technicalError);
        }
        return GetAllCategoryResponseFactory.fromApi(result);
    }

    async save(command: ISaveCategoryCommand): Promise<ISaveCategoryResponse> {
        let result: any;
        try{
            const response = await this.post(ApiRoutes.category.save, command);
            //@ts-ignore
            result = response.data;
            console.warn(result);
            if (!result.status) {
                throw new Error(result.message);
            }
        } catch (e: any) {
            throw new Error(e.message ? e.message : GatewayMessages.technicalError);
        }
        return SaveCategoryResponseFactory.fromApi(result);
    }
}