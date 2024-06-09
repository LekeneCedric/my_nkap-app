import IFilterOperationsResponse from "../../../Feature/Operations/Thunks/Filter/FilterOperationsResponse.ts";
import IOperation from "../../../Domain/Operation/Operation.ts";
import IOperationDto from "../../../Domain/Operation/IOperationDto.ts";

export default class FilterOperationsResponseFactory {
    static buildFromApiResponse(response: any): IFilterOperationsResponse {

        return {
            status: response.status,
            operations: response.operations.map((operation: any):IOperationDto => {
                return {
                    id: operation.id,
                    type: operation.type,
                    accountId: operation.accountId,
                    date: operation.date,
                    details: operation.details,
                    categoryId: operation.categoryId,
                    categoryName: operation.categoryName,
                    categoryIcon: operation.categoryIcon,
                    categoryColor: operation.categoryColor,
                    amount: operation.amount,
                }
            }),
            total: response.total,
            numberOfPages: response.numberOfPages,
        }
    }
}