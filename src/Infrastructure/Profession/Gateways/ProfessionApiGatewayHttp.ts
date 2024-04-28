import { ProfessionApiGateway } from "../../../Domain/profession/ProfessionApiGateway";
import IGetAllProfessionResponse from "../../../Feature/Profession/Thunks/GetAll/GetAllProfessionResponse";
import { ApiRoutes } from "../../Api/routes";
import { HttpProvider } from "../../Shared/gateways/Axios/HttpProvider";
import GetAllProfessionResponseFactory from "../Factories/GetAllProfessionResponseFactory";

export class ProfessionApiGatewayHttp extends HttpProvider implements ProfessionApiGateway {
    async getAll ():Promise<IGetAllProfessionResponse> {
        let result: any;
        
        try{
            const response = await this.get(ApiRoutes.professions.getAll);
            //@ts-ignore
            result = response.data;
            if (!result.status) {
                throw new Error(result.message)
            }
        } catch (e: any) {
            throw new Error('Une erreur technique est survenue , veuillez reessayer plus-tard');
        }
        return GetAllProfessionResponseFactory.fromApi(result);
    };
    
}