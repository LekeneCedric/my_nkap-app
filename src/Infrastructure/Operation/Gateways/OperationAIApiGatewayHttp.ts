import IOperationAIApiGateway from "../../../Domain/Operation/OperationAIApiGateway";
import IProcessingOperationByAiCommand from "../../../Feature/AIOperations/Thunks/ProcessingByAI/ProcessingByAICommand";
import IProcessingOperationByAIResponse from "../../../Feature/AIOperations/Thunks/ProcessingByAI/ProcessingByAIResponse";
import {ApiRoutes} from "../../Api/routes";
import {HttpProvider} from "../../Shared/Gateways/Axios/HttpProvider";
import gatewayMessages from "../../Shared/Gateways/constants/gatewayMessages";
import ProcessingOperationByAIResponseFactory from "../Factories/ProcessingOperationByAIResponseFactory";

export default class OperationAIApiGatewayHttp
  extends HttpProvider
  implements IOperationAIApiGateway
{
  async processingOperationByAI(
    command: IProcessingOperationByAiCommand,
  ): Promise<IProcessingOperationByAIResponse> {
    let result: any;
    const processingCommand = {
      userId: command.userId,
      categories: command.categories.map(ca => { return {"id": ca.id, "label": ca.label}}),
      currentDate: command.currentDate,
      message: command.message,
      language: command.language,
    }
    try {
      const response = await this.post(ApiRoutes.operations.ai, processingCommand);
      //@ts-ignore
      result = response.data;
      if (!result.status) {
        throw new Error(result.message);
      }
    } catch (e: any) {
      throw new Error(e.message ? e.message : gatewayMessages.technicalError);
    }
    return ProcessingOperationByAIResponseFactory.buildFromApiResponse(result);
  } 
}
