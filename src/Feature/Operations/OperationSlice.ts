import {LoadingState} from "../../Domain/Enums/LoadingState.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import FilterOperationsAsync from "./Thunks/Filter/FilterOperationsAsync.ts";
import IFilterOperationsResponse from "./Thunks/Filter/FilterOperationsResponse.ts";
import IOperationDto from "../../Domain/Operation/IOperationDto.ts";
import SaveOperationAsync from "./Thunks/Save/SaveOperationAsync.ts";
import {IOperationFilterParam, IOperationTypeEnum} from "../../Domain/Operation/Operation.ts";
import {formatDateToYYYYMMDD} from "../../Infrastructure/Shared/Utils/DateOperations.ts";


interface IOperationState {
    loadingState: LoadingState,
    operations: IOperationDto[],
    filterParam: IOperationFilterParam,
    total: number,
    page: number,
    limit: number,
}

const initialState: IOperationState = {
    loadingState: LoadingState.idle,
    operations: [],
    filterParam: {
        selectedDate: new Date(),
        formattedDate: "Aujourd'hui",
        date: formatDateToYYYYMMDD(new Date()),
    },
    total: 0,
    page: 1,
    limit: 15,
}

const OperationSlice = createSlice({
    name: "operations",
    initialState: initialState,
    reducers: {
        AddOperation: (state, {payload}:PayloadAction<IOperationDto>) => {
            console.warn(payload);
            state.total = state.total+1;
            state.operations = [payload, ...state.operations];
        },
        ResetFilter: (state) => {
          state.total = initialState.total;
          state.page = initialState.page;
          state.limit = initialState.limit;
          state.filterParam = {
              selectedDate: state.filterParam.selectedDate,
              formattedDate: state.filterParam.formattedDate,
              date: state.filterParam.date,
          };
        },
        ChangeOperationFilterParam: (state, {payload}: PayloadAction<IOperationFilterParam>) => {
           state.filterParam = payload;
           console.warn(payload);
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
                console.warn(state.operations[0])
            })
            .addCase(FilterOperationsAsync.rejected, (state) => {
                state.loadingState = LoadingState.failed;
            });
        builder
            .addCase(SaveOperationAsync.pending, state => {
                state.loadingState = LoadingState.pending;
            })
            .addCase(SaveOperationAsync.rejected, state => {
                state.loadingState = LoadingState.failed;
            })
            .addCase(SaveOperationAsync.fulfilled, (state) => {
                state.loadingState = LoadingState.success;
            });
    }
})

export const {
    AddOperation,
    ChangeOperationFilterParam,
    ResetFilter
} = OperationSlice.actions;
export default OperationSlice.reducer;