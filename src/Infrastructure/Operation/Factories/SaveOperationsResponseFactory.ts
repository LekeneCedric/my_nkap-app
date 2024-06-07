import ISaveOperationResponse from "../../../Feature/Operations/Thunks/Save/SaveOperationResponse.ts";

export default class SaveOperationsResponseFactory {

    static buildFromApiResponse(result: any): ISaveOperationResponse {
        return {
            status: result.status,
            operationSaved: result.operationId,
            operationId: result.operationId,
        }
    }
}