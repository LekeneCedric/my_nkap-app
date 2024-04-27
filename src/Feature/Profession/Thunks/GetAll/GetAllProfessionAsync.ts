import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProfessionApiGateway } from "../../../../Domain/profession/ProfessionApiGateway";
import IGetAllProfessionResponse from "./GetAllProfessionResponse";

export const GetAllProfessionAsync = createAsyncThunk<IGetAllProfessionResponse>(
    'profession/get-all',
    async(_, thunkApi: any) => {
        const professionApiGatewayHttp: ProfessionApiGateway = thunkApi.extra.professionApiGatewayHttp;
        try {
            return await professionApiGatewayHttp.getAll()
        } catch (error: any) {
            const result: any = {};
            return thunkApi.rejectWithValue(result);
        }
    }
)