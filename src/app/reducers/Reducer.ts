import {combineReducers} from '@reduxjs/toolkit';
import ProfessionSlice from '../../Feature/Profession/ProfessionSlice';

export const rootReducer = combineReducers({
    professionReducer: ProfessionSlice,
});
