import { RootState } from "../../app/store";
import IAccount from "../../Domain/Account/Account";
import { LoadingState } from "../../Domain/Enums/LoadingState";

export const selectAccountLoadingState = (state: RootState): LoadingState => {
    return state.accountReducer.loadingState;
}

export const selectAccounts = (state: RootState): IAccount[] => {
    return state.accountReducer.accounts;
}

export const selectTotalBalance = (state: RootState) => {
    return state.accountReducer.totalBalance;
}