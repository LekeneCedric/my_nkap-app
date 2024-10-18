import IOperationAIApiGateway from "../../../Domain/Operation/OperationAIApiGateway";
import IProcessingOperationByAiCommand from "../../../Feature/AIOperations/Thunks/ProcessingByAI/ProcessingByAICommand";
import IProcessingOperationByAIResponse from "../../../Feature/AIOperations/Thunks/ProcessingByAI/ProcessingByAIResponse";
import {ApiRoutes} from "../../Api/routes";
import {HttpProvider} from "../../Shared/Gateways/Axios/HttpProvider";
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
      categories: command.categories.map(ca => { return {"id": ca.id, "label": ca.label}}),
      currentDate: command.currentDate,
      message: command.message,
      language: command.language,
    }
    try {
      const response = await this.post(ApiRoutes.operations.ai, processingCommand);
      //@ts-ignore
      result = response.data;
    } catch (e: any) {
      console.log(e);
      throw new Error("something-went-wrong-model");
    }
    return ProcessingOperationByAIResponseFactory.buildFromApiResponse(result);
  } 
}
