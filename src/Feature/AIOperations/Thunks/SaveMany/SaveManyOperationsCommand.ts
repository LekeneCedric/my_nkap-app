import ISaveOperationCommand from "../../../Operations/Thunks/Save/SaveOperationCommand";

export default interface ISaveManyOperationsCommand {
    operations: ISaveOperationCommand[]
}