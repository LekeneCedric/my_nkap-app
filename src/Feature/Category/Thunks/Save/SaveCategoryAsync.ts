import {createAsyncThunk} from "@reduxjs/toolkit";
import SaveCategoryCommand from "./SaveCategoryCommand.ts";
import ISaveCategoryResponse from "./SaveCategoryResponse.ts";
import ISaveCategoryCommand from "./SaveCategoryCommand.ts";
import IErrorResult from "../../../IErrorResult.ts";
import ICategoryApiGateway from "../../../../Domain/Category/CategoryApiGateway.ts";

const SaveCategoryAsync = createAsyncThunk<ISaveCategoryResponse, ISaveCategoryCommand>(
    'category/save',
    async(command: SaveCategoryCommand, thunkAPI: any) => {
        const categoryApiGatewayHttp: ICategoryApiGateway = thunkAPI.extra.categoryApiGatewayHttp;
        try {
            return await categoryApiGatewayHttp.save(command);
        } catch (error: any) {
            const result: IErrorResult = {
                message: error.message,
            }
            return thunkAPI.rejectWithValue(result);
        }
    }
);
export default SaveCategoryAsync;