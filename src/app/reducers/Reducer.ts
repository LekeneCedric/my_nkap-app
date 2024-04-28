import {combineReducers} from '@reduxjs/toolkit';
import ProfessionSlice from '../../Feature/Profession/ProfessionSlice';
import AuthenticationSlice from '../../Feature/Authentication/AuthenticationSlice';

export const rootReducer = combineReducers({
    professionReducer: ProfessionSlice,
    authenticationReducer: AuthenticationSlice,
});
