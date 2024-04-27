import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingState } from "../../Domain/Enums/LoadingState";
import { IProfession } from "../../Domain/profession/Profession";
import { GetAllProfessionAsync } from "./Thunks/GetAll/GetAllProfessionAsync";
import IGetAllProfessionResponse from "./Thunks/GetAll/GetAllProfessionResponse";

interface ProfessionState {
    loading: LoadingState,
    professions: IProfession[],
}

const initialState: ProfessionState = {
    loading: LoadingState.idle,
    professions: [],
}

export const ProfessionSlice = createSlice({
    name: 'professionSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(GetAllProfessionAsync.pending, state => {
                state.loading = LoadingState.pending;
            })
            .addCase(GetAllProfessionAsync.fulfilled, (state, {payload}: PayloadAction<IGetAllProfessionResponse>) => {
                state.loading = LoadingState.success;
                state.professions = payload.professions;
            })
            .addCase(GetAllProfessionAsync.rejected, state => {
                state.loading = LoadingState.failed;
            })
    }
})

export const {} = ProfessionSlice.actions;
export default ProfessionSlice.reducer;