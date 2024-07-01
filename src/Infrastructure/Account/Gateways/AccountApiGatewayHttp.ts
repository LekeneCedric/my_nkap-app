import IAccountApiGateway from "../../../Domain/Account/AccountApiGateway";
import { IGetAllAccountCommand } from "../../../Feature/Account/Thunks/GetAll/GetAllAccountCommand";
import { IGetAllAccountResponse } from "../../../Feature/Account/Thunks/GetAll/GetAllAccountResponse";
import { ApiRoutes } from "../../Api/routes";
import { HttpProvider } from "../../Shared/Gateways/Axios/HttpProvider";
import GetAllAccountCommandFactory from "../Factories/GetAllAccountCommandFactory";
import ISaveAccountCommand from "../../../Feature/Account/Thunks/Save/SaveAccountCommand.ts";
import ISaveAccountResponse from "../../../Feature/Account/Thunks/Save/SaveAccountResponse.ts";
import SaveAccountResponseFactory from "../Factories/SaveAccountResponseFactory.ts";
import DeleteAccountCommand from "../../../Feature/Account/Thunks/Delete/DeleteAccountCommand.ts";
import DeleteAccountResponse from "../../../Feature/Account/Thunks/Delete/DeleteAccountResponse.ts";
import DeleteAccountResponseFactory from "../Factories/DeleteAccountResponseFactory.ts";

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

    async save(command: ISaveAccountCommand): Promise<ISaveAccountResponse> {
       let result: any;
       try {
           const response = await this.post(ApiRoutes.account.save, command);
           //@ts-ignore;
           result = response.data;
           if (!result.status) {
               throw new Error(result.message);
           }
       } catch (e: any) {
           throw new Error(e.message ? e.message : 'Une erreur technique est survenue , veuillez reessayer plus-tard');
       }
       return SaveAccountResponseFactory.buildFromApiResponse(result);
    }

    async deleteAccount(command: DeleteAccountCommand): Promise<DeleteAccountResponse> {
        let result: any;
        try {
            const response = await this.post(ApiRoutes.account.delete, command);
            //@ts-ignore
            result = response.data;
            if (!result.status) {
                throw new Error(result.message);
            }
        } catch (e: any) {
            throw new Error(e.message ? e.message : 'Une erreur technique est survenue , veuillez reessayer plus-tard')
        }
        return DeleteAccountResponseFactory.buildFromApiResponse(result);
    }
}