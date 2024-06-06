import {HttpProvider} from "../../Shared/Gateways/Axios/HttpProvider.ts";
import IGetAllCategoryCommand from "../../../Feature/Category/Thunks/GetAll/GetAllCategoryCommand.ts";
import IGetAllCategoryResponse from "../../../Feature/Category/Thunks/GetAll/GetAllCategoryResponse.ts";
import {ApiRoutes} from "../../Api/routes";
import GetAllCategoryResponseFactory from "../Factories/GetAllCategoryResponseFactory.ts";

export default class CategoryApiGatewayHttp extends HttpProvider implements CategoryApiGatewayHttp {
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
            throw new Error(e.message ? e.message : 'Une erreur technique est survenue lors du traitement de votre opération');
        }
        return GetAllCategoryResponseFactory.fromApi(result);
    }
}