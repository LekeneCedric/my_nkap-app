import IFilterOperationsCommand from "../../Feature/Operations/Thunks/Filter/FilterOperationsCommand.ts";
import IFilterOperationsResponse from "../../Feature/Operations/Thunks/Filter/FilterOperationsResponse.ts";

export default interface IOperationApiGateway {
    filter: (command: IFilterOperationsCommand) => Promise<IFilterOperationsResponse>,
}