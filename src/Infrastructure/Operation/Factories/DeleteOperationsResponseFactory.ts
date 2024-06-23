import IDeleteOperationResponse from "../../../Feature/Operations/Thunks/Delete/IDeleteOperationResponse.ts";

export default class DeleteOperationsResponseFactory {
    static buildFromApiResponse(result: any) {
        return {
            status: result.status,
            isDeleted: result.isDeleted,
            message: result.message,
            operationId: result.operationId,
        } as IDeleteOperationResponse
    }
}