import { createSlice } from "@reduxjs/toolkit";
import { LoadingState } from "../../Domain/Enums/LoadingState";
import IAccount from "../../Domain/Account/Account";
import { GetAllAccountAsync } from "./Thunks/GetAll/GetAllAccountAsync";
import { IGetAllAccountResponse } from "./Thunks/GetAll/GetAllAccountResponse";
import { PayloadAction } from "@reduxjs/toolkit";

interface IAccountState {
   loadingState: LoadingState,
   accounts: IAccount[], 
}

const initialState: IAccountState = {
    loadingState: LoadingState.idle,
    accounts: [],
}
export const  AccountSlice = createSlice({
    name: 'accountSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(GetAllAccountAsync.pending, state => {
            state.loadingState = LoadingState.pending
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

export const {} = AccountSlice.actions;
export default AccountSlice.reducer;