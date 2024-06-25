import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoadingState} from "../../Domain/Enums/LoadingState";
import IAccount from "../../Domain/Account/Account";
import {GetAllAccountAsync} from "./Thunks/GetAll/GetAllAccountAsync";
import {IGetAllAccountResponse} from "./Thunks/GetAll/GetAllAccountResponse";
import {IOperationTypeEnum} from "../../Domain/Operation/Operation.ts";

interface IAccountState {
    loadingState: LoadingState,
    totalBalance: number,
    accounts: IAccount[],
}

type OperationAction = {
    accountId: string,
    type: IOperationTypeEnum,
    amount: number,
}
const initialState: IAccountState = {
    loadingState: LoadingState.idle,
    totalBalance: 0,
    accounts: [],
}
export const AccountSlice = createSlice({
    name: 'accountSlice',
    initialState: initialState,
    reducers: {
        UpdateAccountByRemovingOperation: (state, {payload}: PayloadAction<OperationAction>) => {
            state.accounts = state.accounts.map(a => {
                if (a.id === payload.accountId) {
                    if (payload.type === IOperationTypeEnum.INCOME) {
                        return {
                            ...a,
                            totalIncomes: a.totalIncomes - payload.amount,
                            balance: a.balance - payload.amount
                        }
                    }
                    if (payload.type === IOperationTypeEnum.EXPENSE) {
                        return {
                            ...a,
                            totalExpenses: a.totalExpenses - payload.amount,
                            balance: a.balance + payload.amount
                        }
                    }
                }
                return a;
            });
            state.totalBalance = 0;
            state.accounts.map(ac => {
                if (ac.isIncludeInTotalBalance == 1) {
                    state.totalBalance += ac.balance;
                }
            })
        },
        UpdateAccountByAddingOperation: (state, {payload}: PayloadAction<OperationAction>) => {
            state.accounts = state.accounts.map(a => {
                if (a.id === payload.accountId) {
                    if (payload.type === IOperationTypeEnum.INCOME) {
                        return {
                            ...a,
                            totalIncomes: a.totalIncomes + payload.amount,
                            balance: a.balance + payload.amount,
                        }
                    }
                    if (payload.type === IOperationTypeEnum.EXPENSE) {
                        return {
                            ...a,
                            totalExpenses: a.totalExpenses + payload.amount,
                            balance: a.balance - payload.amount,
                        }
                    }
                }
                return a;
            });
            state.totalBalance = 0;
            state.accounts.map(ac => {
                if (ac.isIncludeInTotalBalance == 1) {
                    state.totalBalance += ac.balance;
                }
            })
        },
    },
    extraReducers: builder => {
        builder
            .addCase(GetAllAccountAsync.pending, state => {
                state.loadingState = LoadingState.pending;
            })
            .addCase(GetAllAccountAsync.fulfilled, (state, {payload}: PayloadAction<IGetAllAccountResponse>) => {
                state.totalBalance = 0;
                state.loadingState = LoadingState.success;
                state.accounts = payload.accounts;
                payload.accounts.map(ac => {
                   if (ac.isIncludeInTotalBalance == 1) {
                       state.totalBalance = state.totalBalance + ac.balance;
                   }
                });
            })
            .addCase(GetAllAccountAsync.rejected, state => {
                state.loadingState = LoadingState.failed;
            })
    }
});

export const {
    UpdateAccountByAddingOperation,
    UpdateAccountByRemovingOperation,
} = AccountSlice.actions;
export default AccountSlice.reducer;