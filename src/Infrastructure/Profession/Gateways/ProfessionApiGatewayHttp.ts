import { ProfessionApiGateway } from "../../../Domain/profession/ProfessionApiGateway";
import IGetAllProfessionResponse from "../../../Feature/Profession/Thunks/GetAll/GetAllProfessionResponse";
import { ApiRoutes } from "../../Api/routes";
import { HttpProvider } from "../../Shared/gateways/Axios/HttpProvider";
import GetAllProfessionResponseFactory from "../Factories/GetAllProfessionResponseFactory";

export class professionApiGatewayHttp extends HttpProvider implements ProfessionApiGateway {
    async getAll ():Promise<IGetAllProfessionResponse> {
        let result: any;
        
        try{
            const response = await this.get(ApiRoutes.professions.getAll);
            result = response.data;
            if (!result.status) {
                throw new Error(result.message)
            }
        } catch (e: any) {
            console.warn(e)
            throw new Error(e);
        }
        return GetAllProfessionResponseFactory.fromApi(result);
    };
    
}