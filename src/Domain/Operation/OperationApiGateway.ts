import IFilterOperationsCommand from "../../Feature/Operations/Thunks/Filter/FilterOperationsCommand.ts";
import IFilterOperationsResponse from "../../Feature/Operations/Thunks/Filter/FilterOperationsResponse.ts";
import ISaveOperationCommand from "../../Feature/Operations/Thunks/Save/SaveOperationCommand.ts";
import ISaveOperationResponse from "../../Feature/Operations/Thunks/Save/SaveOperationResponse.ts";

export default interface IOperationApiGateway {
    filter: (command: IFilterOperationsCommand) => Promise<IFilterOperationsResponse>,
    save: (command: ISaveOperationCommand) => Promise<ISaveOperationResponse>,
}