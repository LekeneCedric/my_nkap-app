import {combineReducers} from '@reduxjs/toolkit';
import ProfessionSlice from '../../Feature/Profession/ProfessionSlice';
import AuthenticationSlice from '../../Feature/Authentication/AuthenticationSlice';
import AccountSlice from '../../Feature/Account/AccountSlice';

export const rootReducer = combineReducers({
    professionReducer: ProfessionSlice,
    authenticationReducer: AuthenticationSlice,
    accountReducer: AccountSlice,
});
