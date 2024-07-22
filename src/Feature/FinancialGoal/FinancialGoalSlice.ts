import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFinancialGoal} from "../../Domain/FinancialGoal/FinancialGoal.ts";
import {LoadingState} from "../../Domain/Enums/LoadingState.ts";
import SaveFinancialGoalAsync from "./Thunks/Save/SaveFinancialGoalAsync.ts";
import Loading from "../../ui/React-native/Components/Loading/Loading.tsx";
import GetAllFinancialGoalAsync from "./Thunks/GetAll/GetAllFinancialGoalAsync.ts";
import IGetAllFinancialGoalResponse from "./Thunks/GetAll/GetAllFinancialGoalResponse.ts";
import {IOperationTypeEnum} from "../../Domain/Operation/Operation.ts";

type FinancialGoalInitialState = {
    loadingState: LoadingState,
    financialGoals: IFinancialGoal[]
}
type UpdateFinancialGoalAfterSaveOperationPayload = {
    accountId: string,
    amount: number,
    type: IOperationTypeEnum,
    date: string,
    isUpdate: boolean,
    isDelete?: boolean,
    previousAmount: number
}
const initialState: FinancialGoalInitialState = {
    loadingState: LoadingState.idle,
    financialGoals: []
}
const FinancialGoalSlice = createSlice({
    name: 'financialGoalSlice',
    initialState: initialState,
    reducers: {
        AddFinancialGoal: (state, {payload}: PayloadAction<IFinancialGoal>) => {
            state.financialGoals = [
                ...state.financialGoals,
                payload,
            ];
        },
        DeleteFinancialGoal: (state, {payload}: PayloadAction<{ financialGoalId: string }>) => {
            state.financialGoals = state.financialGoals.filter(f => f.id !== payload.financialGoalId);
        },
        UpdateFinancialGoal: (state, {payload}: PayloadAction<IFinancialGoal>) => {
            state.financialGoals = state.financialGoals.map(f => {
                if (f.id === payload.id) {
                    return payload;
                }
                return f;
            })
        },
        UpdateFinancialGoalAfterSaveOperation: (
            state,
            {
                payload: {
                    accountId,
                    type,
                    previousAmount,
                    amount,
                    date,
                    isUpdate,
                    isDelete,
                }
            }: PayloadAction<UpdateFinancialGoalAfterSaveOperationPayload>) => {
            state.financialGoals = state.financialGoals.map(f => {
                let operationDateIsInFinancialGoalInterval =
                    new Date(date).getTime() >= new Date(f.startDate).getTime();
                let financialGoalAndOperationIsFromSameAccount = f.accountId === accountId;
                let updatedFinancialGoalCurrentAmount = f.currentAmount;
                if (financialGoalAndOperationIsFromSameAccount && operationDateIsInFinancialGoalInterval) {
                    console.warn(isUpdate);
                    console.warn(type);
                    console.warn(IOperationTypeEnum.INCOME)
                    if (!isUpdate) {
                        if (type === IOperationTypeEnum.INCOME) {
                            updatedFinancialGoalCurrentAmount += amount;
                        }
                        if (type === IOperationTypeEnum.EXPENSE) {
                            updatedFinancialGoalCurrentAmount -= amount;
                        }
                    }
                    if (isUpdate) {
                        if (type === IOperationTypeEnum.INCOME) {
                            updatedFinancialGoalCurrentAmount -= previousAmount;
                            updatedFinancialGoalCurrentAmount += amount;
                        }
                        if (type === IOperationTypeEnum.EXPENSE) {
                            updatedFinancialGoalCurrentAmount += previousAmount;
                            updatedFinancialGoalCurrentAmount -= amount;
                        }
                    }
                    if (isDelete) {
                        if (type === IOperationTypeEnum.INCOME) {
                            updatedFinancialGoalCurrentAmount -= amount;
                        }
                        if (type === IOperationTypeEnum.EXPENSE) {
                            updatedFinancialGoalCurrentAmount += amount;
                        }
                    }
                }
                let updatedFinancialGoalIsCompleteStatus = updatedFinancialGoalCurrentAmount >= f.desiredAmount;
                return {
                    ...f,
                    currentAmount: updatedFinancialGoalCurrentAmount,
                    isComplete: updatedFinancialGoalIsCompleteStatus,
                }
            });
        }
    },
    extraReducers: builder => {
        builder
            .addCase(SaveFinancialGoalAsync.pending, state => {
                state.loadingState = LoadingState.pending;
            })
            .addCase(SaveFinancialGoalAsync.fulfilled, state => {
                state.loadingState = LoadingState.success;
            })
            .addCase(SaveFinancialGoalAsync.rejected, state => {
                state.loadingState = LoadingState.failed;
            });
        builder
            .addCase(GetAllFinancialGoalAsync.pending, state => {
                state.loadingState = LoadingState.pending;
            })
            .addCase(GetAllFinancialGoalAsync.fulfilled, (state, {payload}: PayloadAction<IGetAllFinancialGoalResponse>) => {
                state.loadingState = LoadingState.success;
                state.financialGoals = payload.financialGoals;
                console.warn(state.financialGoals);
            })
            .addCase(GetAllFinancialGoalAsync.rejected, state => {
                state.loadingState = LoadingState.failed;
            })
    }
});

export const {
    AddFinancialGoal,
    DeleteFinancialGoal,
    UpdateFinancialGoal,
    UpdateFinancialGoalAfterSaveOperation
} = FinancialGoalSlice.actions;
export default FinancialGoalSlice.reducer;