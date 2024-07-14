import {HttpProvider} from "../../Shared/Gateways/Axios/HttpProvider.ts";
import IFinancialGoalApiGateway from "../../../Domain/FinancialGoal/FinancialGoalApiGateway.ts";
import ISaveFinancialGoalCommand from "../../../Feature/FinancialGoal/Thunks/Save/ISaveFinancialGoalCommand.ts";
import ISaveFinancialGoalResponse from "../../../Feature/FinancialGoal/Thunks/Save/ISaveFinancialGoalResponse.ts";
import GatewayMessages from "../../Shared/Gateways/constants/gatewayMessages.ts";
import {ApiRoutes} from "../../Api/routes";
import SaveFinancialGoalResponseFactory from "../Factories/SaveFinancialGoalResponseFactory.ts";

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

}