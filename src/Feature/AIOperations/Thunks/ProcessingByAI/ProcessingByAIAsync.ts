import { createAsyncThunk } from "@reduxjs/toolkit";
import IProcessingOperationByAIResponse from "./ProcessingByAIResponse";
import IProcessingOperationByAiCommand from "./ProcessingByAICommand";
import IOperationAIApiGateway from "../../../../Domain/Operation/OperationAIApiGateway";
import IErrorResult from "../../../IErrorResult";

const ProcessingOperationByAIAsync = createAsyncThunk<IProcessingOperationByAIResponse, IProcessingOperationByAiCommand>(
    'ai-operation/processing',
    async (command: IProcessingOperationByAiCommand, thunkAPI: any) => {
        const operationAIApiGateway: IOperationAIApiGateway = thunkAPI.extra.operationAIApiGatewayHttp;
        try {
            return await operationAIApiGateway.processingOperationByAI(command);
        } catch(error: any) {
            const errorResult: IErrorResult = {
                message: error.message,
            }
            return thunkAPI.rejectWithValue(errorResult);
        }
    }
);

export default ProcessingOperationByAIAsync;