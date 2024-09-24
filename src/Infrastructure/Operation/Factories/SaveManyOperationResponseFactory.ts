import ISaveManyOperationsResponse from "../../../Feature/AIOperations/Thunks/SaveMany/SaveManyOperationsResponse";

export default class SaveManyOperationResponseFactory {
    static buildFromApiResponse(result: any): ISaveManyOperationsResponse {
        return {
            status: result.status,
            operationIds: result.operationIds,
            operationsSaved: result.operationsSaved,
        }
    }
}