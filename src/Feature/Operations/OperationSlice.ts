import {LoadingState} from "../../Domain/Enums/LoadingState.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import FilterOperationsAsync from "./Thunks/Filter/FilterOperationsAsync.ts";
import IFilterOperationsResponse from "./Thunks/Filter/FilterOperationsResponse.ts";
import SaveCategoryAsync from "../Category/Thunks/Save/SaveCategoryAsync.ts";
import IOperationDto from "../../Domain/Operation/IOperationDto.ts";

interface IOperationState {
    loadingState: LoadingState,
    operations: IOperationDto[],
    total: number,
    page: number,
    limit: number,
}

const initialState: IOperationState = {
    loadingState: LoadingState.idle,
    operations: [],
    total: 0,
    page: 1,
    limit: 15,
}

const OperationSlice = createSlice({
    name: "operations",
    initialState: initialState,
    reducers: {
        AddOperation: (state, {payload}:PayloadAction<IOperationDto>) => {
            state.total = state.total+1;
            let operations = state.operations;
            operations.unshift(payload);
            state.operations = operations;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(FilterOperationsAsync.pending, (state) => {
                state.loadingState = LoadingState.pending;
            })
            .addCase(FilterOperationsAsync.fulfilled, (state, {payload}: PayloadAction<IFilterOperationsResponse>) => {
                state.loadingState = LoadingState.success;
                state.total = payload.total;
                state.operations = payload.operations;
                state.page += 1;
            })
            .addCase(FilterOperationsAsync.rejected, (state) => {
                state.loadingState = LoadingState.failed;
            });
        builder
            .addCase(SaveCategoryAsync.pending, state => {
                state.loadingState = LoadingState.pending;
            })
            .addCase(SaveCategoryAsync.rejected, state => {
                state.loadingState = LoadingState.failed;
            })
            .addCase(SaveCategoryAsync.fulfilled, (state) => {
                state.loadingState = LoadingState.success;
            });
    }
})

export const {AddOperation} = OperationSlice.actions;
export default OperationSlice.reducer;