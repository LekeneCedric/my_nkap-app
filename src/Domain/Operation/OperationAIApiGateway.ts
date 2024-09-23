import IProcessingOperationByAiCommand from "../../Feature/AIOperations/Thunks/ProcessingByAI/ProcessingByAICommand";
import IProcessingOperationByAIResponse from "../../Feature/AIOperations/Thunks/ProcessingByAI/ProcessingByAIResponse";

export default interface IOperationAIApiGateway {
    processingOperationByAI: (command: IProcessingOperationByAiCommand) => Promise<IProcessingOperationByAIResponse>
}