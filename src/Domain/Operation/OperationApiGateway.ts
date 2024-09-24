import IFilterOperationsCommand from "../../Feature/Operations/Thunks/Filter/FilterOperationsCommand.ts";
import IFilterOperationsResponse from "../../Feature/Operations/Thunks/Filter/FilterOperationsResponse.ts";
import ISaveOperationCommand from "../../Feature/Operations/Thunks/Save/SaveOperationCommand.ts";
import ISaveOperationResponse from "../../Feature/Operations/Thunks/Save/SaveOperationResponse.ts";
import IDeleteOperationCommand from "../../Feature/Operations/Thunks/Delete/IDeleteOperationCommand.ts";
import IDeleteOperationResponse from "../../Feature/Operations/Thunks/Delete/IDeleteOperationResponse.ts";
import ISaveManyOperationsCommand from "../../Feature/AIOperations/Thunks/SaveMany/SaveManyOperationsCommand.ts";
import ISaveManyOperationsResponse from "../../Feature/AIOperations/Thunks/SaveMany/SaveManyOperationsResponse.ts";

export default interface IOperationApiGateway {
    filter: (command: IFilterOperationsCommand) => Promise<IFilterOperationsResponse>,
    save: (command: ISaveOperationCommand) => Promise<ISaveOperationResponse>,
    saveMany: (command: ISaveManyOperationsCommand) => Promise<ISaveManyOperationsResponse>,
    deleteOperation: (command: IDeleteOperationCommand) => Promise<IDeleteOperationResponse>;
}   