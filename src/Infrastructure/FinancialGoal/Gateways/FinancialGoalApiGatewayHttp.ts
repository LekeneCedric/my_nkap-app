import {HttpProvider} from "../../Shared/Gateways/Axios/HttpProvider.ts";
import IFinancialGoalApiGateway from "../../../Domain/FinancialGoal/FinancialGoalApiGateway.ts";
import ISaveFinancialGoalCommand from "../../../Feature/FinancialGoal/Thunks/Save/SaveFinancialGoalCommand.ts";
import ISaveFinancialGoalResponse from "../../../Feature/FinancialGoal/Thunks/Save/SaveFinancialGoalResponse.ts";
import GatewayMessages from "../../Shared/Gateways/constants/gatewayMessages.ts";
import {ApiRoutes} from "../../Api/routes";
import SaveFinancialGoalResponseFactory from "../Factories/SaveFinancialGoalResponseFactory.ts";
import IDeleteFinancialGoalCommand from "../../../Feature/FinancialGoal/Thunks/Delete/DeleteFinancialGoalCommand.ts";
import IDeleteFinancialGoalResponse from "../../../Feature/FinancialGoal/Thunks/Delete/DeleteFinancialGoalResponse.ts";
import DeleteFinancialGoalResponseFactory from "../Factories/DeleteFinancialGoalResponseFactory.ts";
import IGetAllFinancialGoalCommand from "../../../Feature/FinancialGoal/Thunks/GetAll/GetAllFinancialGoalCommand.ts";
import IGetAllFinancialGoalResponse from "../../../Feature/FinancialGoal/Thunks/GetAll/GetAllFinancialGoalResponse.ts";
import GetAllFinancialGoalResponseFactory from "../Factories/GetAllFinancialGoalResponseFactory.ts";

export default class FinancialGoalApiGatewayHttp extends HttpProvider implements IFinancialGoalApiGateway{
    async save(command: ISaveFinancialGoalCommand): Promise<ISaveFinancialGoalResponse> {
        let result: any;

        try {
            const response = await this.post(ApiRoutes.financialGoal.save, command);
            //@ts-ignore
            result = response.data;
            if (!result.status || !result.isMake) {
                throw new Error(result.message);
            }
        } catch (e: any) {
            throw new Error(e.message ? e.message : GatewayMessages.technicalError);
        }
        return SaveFinancialGoalResponseFactory.fromApi(result);
    }

    async deleteFinancialGoal(command: IDeleteFinancialGoalCommand): Promise<IDeleteFinancialGoalResponse> {
        let result: any;

        try {
            const response = await this.post(ApiRoutes.financialGoal.delete, command);
            //@ts-ignore
            result = response.data;
            if (!result.status) {
                throw new Error(result.message);
            }
        } catch (e: any) {
            throw new Error(e.message ? e.message : GatewayMessages.technicalError);
        }
        return DeleteFinancialGoalResponseFactory.fromApi(result);
    }

    async getAll(command: IGetAllFinancialGoalCommand): Promise<IGetAllFinancialGoalResponse> {
        let result: any;

        try {
            const response = await this.post(ApiRoutes.financialGoal.getAll, command);
            //@ts-ignore
            result = response.data;
            if (!result.status) {
                throw new Error(result.message);
            }
        } catch (e: any) {
            throw new Error(e.message ? e.message : GatewayMessages.technicalError);
        }
        return GetAllFinancialGoalResponseFactory.fromApi(result);
    }
}