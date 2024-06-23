import {LoadingState} from "../../Domain/Enums/LoadingState.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import FilterOperationsAsync from "./Thunks/Filter/FilterOperationsAsync.ts";
import IFilterOperationsResponse from "./Thunks/Filter/FilterOperationsResponse.ts";
import IOperationDto from "../../Domain/Operation/IOperationDto.ts";
import SaveOperationAsync from "./Thunks/Save/SaveOperationAsync.ts";
import {IOperationFilterParam, OperationDateItem} from "../../Domain/Operation/Operation.ts";
import {formatDateToYYYYMMDD} from "../../Infrastructure/Shared/Utils/DateOperations.ts";
import DeleteOperationAsync from "./Thunks/Delete/DeleteOperationAsync.ts";
import IDeleteOperationResponse from "./Thunks/Delete/IDeleteOperationResponse.ts";


interface IOperationState {
    loadingState: LoadingState,
    operations: IOperationDto[],
    operationsByDate:OperationDateItem[],
    filterParam: IOperationFilterParam,
    total: number,
    page: number,
    limit: number,
}

const initialState: IOperationState = {
    loadingState: LoadingState.idle,
    operations: [],
    operationsByDate: [],
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
        AddOperation: (state, {payload}: PayloadAction<IOperationDto>) => {
            const today = new Date();
            if (today.getDate() == new Date(state.filterParam.selectedDate!).getDate()) {
                state.total = state.total + 1;
                state.operations = [payload, ...state.operations];
            }
        },
        UpdateOperation: (state, {payload}: PayloadAction<IOperationDto>) => {
            state.operations = state.operations.map(op => {
                if (op.id === payload.id) {
                    return payload;
                }
                return op;
            })
        },
        ResetFilter: (state) => {
            state.total = initialState.total;
            state.page = initialState.page;
            state.limit = initialState.limit;
            state.filterParam = {
                selectedDate: state.filterParam.selectedDate,
                formattedDate: state.filterParam.formattedDate,
                date: state.filterParam.date,
                categoryId: undefined,
                categoryLabel: undefined,
                categoryIcon: undefined,
                operationType: undefined,
                typeLabel: undefined,
            };
        },
        // FilterOperationsByDate: (state, {payload}: PayloadAction<IOperationDto[]>) => {
        //     const data: any = payload.reduce((acc: any, item) => {
        //         // Extract the date part (YYYY-MM-DD) from the datetime field
        //         const date = new Date(item.date).toISOString().split('T')[0];
        //
        //         // Group items by date
        //         if (!acc[date]) {
        //             acc[date] = {
        //                 totalExpense: 0,
        //                 totalIncomes: 0,
        //                 date: date,
        //                 operations: []
        //             }
        //         }
        //         if (item.type === IOperationTypeEnum.EXPENSE) {
        //             acc[date].totalExpense+= item.amount;
        //         }
        //         if (item.type === IOperationTypeEnum.INCOME) {
        //             acc[date].totalIncomes+= item.amount;
        //         }
        //         acc[date].operations.push(item);
        //
        //         return acc;
        //     }, {});
        //     console.warn(data);
        // },
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
                state.operationsByDate = payload.operationsByDate;
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
        builder
            .addCase(DeleteOperationAsync.pending, state => {
                state.loadingState = LoadingState.pending;
            })
            .addCase(DeleteOperationAsync.rejected, state => {
                state.loadingState = LoadingState.success;
            })
            .addCase(DeleteOperationAsync.fulfilled, (state, {payload}: PayloadAction<IDeleteOperationResponse>) => {
                state.loadingState = LoadingState.success;
                state.operations = state.operations.filter(op => op.id != payload.operationId)
            })
    }
})

export const {
    AddOperation,
    UpdateOperation,
    ChangeOperationFilterParam,
    ResetFilter,
} = OperationSlice.actions;
export default OperationSlice.reducer;