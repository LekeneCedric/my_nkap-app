import {combineReducers} from '@reduxjs/toolkit';
import ProfessionSlice from '../../Feature/Profession/ProfessionSlice';
import AuthenticationSlice from '../../Feature/Authentication/AuthenticationSlice';
import AccountSlice from '../../Feature/Account/AccountSlice';
import OperationSlice from "../../Feature/Operations/OperationSlice.ts";
import CategorySlice from "../../Feature/Category/CategorySlice.ts";

export const rootReducer = combineReducers({
    professionReducer: ProfessionSlice,
    authenticationReducer: AuthenticationSlice,
    accountReducer: AccountSlice,
    operationReducer: OperationSlice,
    categoryReducer: CategorySlice,
});
