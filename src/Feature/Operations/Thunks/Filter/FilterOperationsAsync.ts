import {createAsyncThunk} from "@reduxjs/toolkit";
import IErrorResult from "../../../IErrorResult.ts";
import IFilterOperationsCommand from "./FilterOperationsCommand.ts";
import IFilterOperationsResponse from "./FilterOperationsResponse.ts";
import IOperationApiGateway from "../../../../Domain/Operation/OperationApiGateway.ts";

const FilterOperationsAsync= createAsyncThunk<
    IFilterOperationsResponse, IFilterOperationsCommand
>(
    'operations/filter',
    async (command: IFilterOperationsCommand, thunkApi: any) => {
        const operationsApiGatewayHttp: IOperationApiGateway = thunkApi.extra.operationsApiGatewayHttp;
        try {
            return await operationsApiGatewayHttp.filter(command);
        } catch (error: any) {
            const result : IErrorResult = {
                message: error.message,
            }
            return thunkApi.rejectWithValue(result);
        }
    }
);
export default FilterOperationsAsync;