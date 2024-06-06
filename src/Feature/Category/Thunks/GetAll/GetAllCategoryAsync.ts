import {createAsyncThunk} from "@reduxjs/toolkit";
import IGetAllCategoryResponse from "./GetAllCategoryResponse.ts";
import IGetAllCategoryCommand from "./GetAllCategoryCommand.ts";
import IErrorResult from "../../../IErrorResult.ts";

const GetAllCategoryAsync = createAsyncThunk<IGetAllCategoryResponse, IGetAllCategoryCommand>(
    'category/getAll',
    async (command: IGetAllCategoryCommand, thunkAPI: any) => {
        const categoryApiGatewayHttp = thunkAPI.extra.categoryApiGatewayHttp;
        try {
            return await categoryApiGatewayHttp.getAll(command);
        } catch (error: any) {
            const result: IErrorResult = {
                message: error.message,
            }
            return thunkAPI.rejectWithValue(result);
        }

    }
);
export default GetAllCategoryAsync;