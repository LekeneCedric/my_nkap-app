import { IOperationTypeEnum } from "../../../Domain/Operation/Operation";
import IProcessingOperationByAIResponse from "../../../Feature/AIOperations/Thunks/ProcessingByAI/ProcessingByAIResponse";

export default class ProcessingOperationByAIResponseFactory {
    static buildFromApiResponse(result: any): IProcessingOperationByAIResponse {
        return {
            data: result.map((item: any) => {
                console.table('item', item);
                console.log('id:',`${item.type}#${item.amount}#${item.categoryId}#${item.title}#${item.date}`)
                return {
                    uuid: `${item.type}#${item.amount}#${item.categoryId}#${item.title}#${item.date}`,
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