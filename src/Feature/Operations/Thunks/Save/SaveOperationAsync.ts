import {createAsyncThunk} from "@reduxjs/toolkit";
import IOperationApiGateway from "../../../../Domain/Operation/OperationApiGateway.ts";
import IErrorResult from "../../../IErrorResult.ts";
import ISaveOperationCommand from "./SaveOperationCommand.ts";
import ISaveOperationResponse from "./SaveOperationResponse.ts";

const SaveOperationAsync = createAsyncThunk<ISaveOperationResponse, ISaveOperationCommand>(
    'operations/save',
    async(command: ISaveOperationCommand, thunkAPI: any) => {
        const operationApiGatewayHttp: IOperationApiGateway = thunkAPI.extra.operationsApiGatewayHttp;
        try {
            return await operationApiGatewayHttp.save(command);
        } catch (error: any) {
            const errorResult: IErrorResult = {
                message: error.message,
            }
            return thunkAPI.rejectWithValue(errorResult);
        }
    }
);
export default SaveOperationAsync;