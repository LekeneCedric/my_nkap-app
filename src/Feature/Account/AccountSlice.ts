import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoadingState} from "../../Domain/Enums/LoadingState";
import IAccount from "../../Domain/Account/Account";
import {GetAllAccountAsync} from "./Thunks/GetAll/GetAllAccountAsync";
import {IGetAllAccountResponse} from "./Thunks/GetAll/GetAllAccountResponse";
import {IOperationTypeEnum} from "../../Domain/Operation/Operation.ts";

interface IAccountState {
   loadingState: LoadingState,
   accounts: IAccount[], 
}
type OperationAction = {
    accountId: string,
    type: IOperationTypeEnum,
    amount: number,
}
const initialState: IAccountState = {
    loadingState: LoadingState.idle,
    accounts: [],
}
export const  AccountSlice = createSlice({
    name: 'accountSlice',
    initialState: initialState,
    reducers: {
        UpdateAccountBalance: (state, {payload}: PayloadAction<OperationAction>) => {
            let updatedAccount = state.accounts.find(a => a.id = payload.accountId)!;
            if (!updatedAccount) return ;
            if (payload.type == IOperationTypeEnum.INCOME) {
                updatedAccount.balance = updatedAccount.balance + payload.amount;
                updatedAccount.totalIncomes = updatedAccount.totalIncomes + payload.amount;
            }
            if (payload.type == IOperationTypeEnum.EXPENSE) {
                updatedAccount.balance = updatedAccount.balance - payload.amount;
                updatedAccount.totalExpenses = updatedAccount.totalExpenses + payload.amount;
            }
            let updatedAccounts: IAccount[] = [];
            state.accounts.map((account: IAccount) => {
                if (account.id !== payload.accountId){
                    updatedAccounts.push(account)
                };
                if (account.id === payload.accountId){
                    updatedAccounts.push(updatedAccount);
                }
            });
            state.accounts = updatedAccounts;
        }
    },
    extraReducers: builder => {
        builder
        .addCase(GetAllAccountAsync.pending, state => {
            state.loadingState = LoadingState.pending;
        })
        .addCase(GetAllAccountAsync.fulfilled, (state, {payload}: PayloadAction<IGetAllAccountResponse>) => {
            state.loadingState = LoadingState.success;
            state.accounts = payload.accounts;
        })
        .addCase(GetAllAccountAsync.rejected, state => {
            state.loadingState = LoadingState.failed;
        })
    }
});

export const {UpdateAccountBalance} = AccountSlice.actions;
export default AccountSlice.reducer;