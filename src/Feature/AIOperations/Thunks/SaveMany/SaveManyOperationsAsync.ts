import { createAsyncThunk } from "@reduxjs/toolkit";
import ISaveManyOperationsCommand from "./SaveManyOperationsCommand";
import ISaveManyOperationsResponse from "./SaveManyOperationsResponse";
import IOperationApiGateway from "../../../../Domain/Operation/OperationApiGateway";
import IErrorResult from "../../../IErrorResult";

const SaveManyOperationsAsync = createAsyncThunk<ISaveManyOperationsResponse, ISaveManyOperationsCommand>(
    'operations/save-many',
    async(command: ISaveManyOperationsCommand, thunkAPI: any) => {
        const operationApiGatewayHttp: IOperationApiGateway = thunkAPI.extra.operationsApiGatewayHttp;
        try {
            return await operationApiGatewayHttp.saveMany(command);
        } catch (error: any) {
            const errorResult: IErrorResult = {
                message: error.message,
            };
            return thunkAPI.rejectWithValue(errorResult);
        }
    }
);

export default SaveManyOperationsAsync;