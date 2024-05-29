import {LoadingState} from "../../Domain/Enums/LoadingState.ts";
import IOperation from "../../Domain/Operation/Operation.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import FilterOperationsAsync from "./Thunks/Filter/FilterOperationsAsync.ts";
import IFilterOperationsResponse from "./Thunks/Filter/FilterOperationsResponse.ts";

interface IOperationState {
    loadingState: LoadingState,
    operations: IOperation[],
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
    reducers: {},
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
    }
})

export const {} = OperationSlice.actions;
export default OperationSlice.reducer;