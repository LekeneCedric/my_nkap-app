import { IOperationTypeEnum } from "../../../Domain/Operation/Operation";
import IProcessingOperationByAIResponse from "../../../Feature/AIOperations/Thunks/ProcessingByAI/ProcessingByAIResponse";

export default class ProcessingOperationByAIResponseFactory {
    static buildFromApiResponse(result: any): IProcessingOperationByAIResponse {
        return {
            consumedToken: result.consumedToken,
            data: result.operations.map((item: any) => {
                return {
                    uuid: item.uuid,
                    type: item.type == 1 ? IOperationTypeEnum.INCOME : IOperationTypeEnum.EXPENSE,
                    amount: item.amount,
                    categoryId: item.categoryId,
                    date: item.date,
                    title: item.title,
                }
            }),
        }
    }
}