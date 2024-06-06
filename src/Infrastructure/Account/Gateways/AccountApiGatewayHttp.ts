import IAccountApiGateway from "../../../Domain/Account/AccountApiGateway";
import { IGetAllAccountCommand } from "../../../Feature/Account/Thunks/GetAll/GetAllAccountCommand";
import { IGetAllAccountResponse } from "../../../Feature/Account/Thunks/GetAll/GetAllAccountResponse";
import { ApiRoutes } from "../../Api/routes";
import { HttpProvider } from "../../Shared/Gateways/Axios/HttpProvider";
import GetAllAccountCommandFactory from "../Factories/GetAllAccountCommandFactory";

export default class AccountApiGatewayHttp extends HttpProvider implements IAccountApiGateway {
    async getAll (command: IGetAllAccountCommand): Promise<IGetAllAccountResponse> {
        let result: any;

        try {
            const response = await this.get(`${ApiRoutes.account.all}/${command.userId}`);
            //@ts-ignore
            result = response.data;
            if (!result.status) {
                throw new Error(result.message);
            }
        } catch (e: any) {
            throw new Error(e.message ? e.message : 'Une erreur technique est survenue , veuillez reessayer plus-tard');
        }
        return GetAllAccountCommandFactory.buildFromApiResponse(result);
    }

}