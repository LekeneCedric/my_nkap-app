import IFilterOperationsResponse from "../../../Feature/Operations/Thunks/Filter/FilterOperationsResponse.ts";
import IOperation from "../../../Domain/Operation/Operation.ts";

export default class FilterOperationsResponseFactory {
    static buildFromApiResponse(response: any): IFilterOperationsResponse {

        return {
            status: response.status,
            operations: response.operations.map((operation: any):IOperation => {
                return {
                    id: operation.operationId,
                    type: operation.operationType,
                    accountId: operation.accountId,
                    date: operation.operationDate,
                    details: operation.operationDetails,
                    category: operation.operationCategory,
                    amount: operation.operationAmount,
                }
            }),
            total: response.total,
            numberOfPages: response.numberOfPages,
        }
    }
}