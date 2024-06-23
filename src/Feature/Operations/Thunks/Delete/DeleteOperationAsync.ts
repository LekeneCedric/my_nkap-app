import {createAsyncThunk} from "@reduxjs/toolkit";
import IOperationApiGateway from "../../../../Domain/Operation/OperationApiGateway.ts";
import IErrorResult from "../../../IErrorResult.ts";
import IDeleteOperationCommand from "./IDeleteOperationCommand.ts";
import IDeleteOperationResponse from "./IDeleteOperationResponse.ts";

const DeleteOperationAsync = createAsyncThunk<IDeleteOperationResponse, IDeleteOperationCommand>(
    'operation/delete',
    async(command: IDeleteOperationCommand, thunkAPI: any) => {
        const operationsApiHttp: IOperationApiGateway = thunkAPI.extra.operationsApiGatewayHttp;
        try {
            return await operationsApiHttp.deleteOperation(command);
        } catch (error: any) {
            const errorResult: IErrorResult = {
                message: error.message,
            }
            return thunkAPI.rejectWithValue(errorResult);
        }
    }
);
export default DeleteOperationAsync;