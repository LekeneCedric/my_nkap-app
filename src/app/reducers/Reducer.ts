import {combineReducers} from '@reduxjs/toolkit';
import ProfessionSlice from '../../Feature/Profession/ProfessionSlice';
import AuthenticationSlice from '../../Feature/Authentication/AuthenticationSlice';
import AccountSlice from '../../Feature/Account/AccountSlice';
import OperationSlice from "../../Feature/Operations/OperationSlice.ts";
import CategorySlice from "../../Feature/Category/CategorySlice.ts";
import ConfigurationSlice from "../../Feature/Configuration/ConfigurationSlice.ts";
import FinancialGoalSlice from "../../Feature/FinancialGoal/FinancialGoalSlice.ts";
import StatisticsSlice from "../../Feature/Statistics/StatisticsSlice.ts";
import OperationProcessingByAISlice from '../../Feature/AIOperations/ProcessingByAISlice.ts';

export const rootReducer = combineReducers({
    professionReducer: ProfessionSlice,
    authenticationReducer: AuthenticationSlice,
    accountReducer: AccountSlice,
    operationReducer: OperationSlice,
    categoryReducer: CategorySlice,
    configurationReducer: ConfigurationSlice,
    financialGoalReducer: FinancialGoalSlice,
    statisticsReducer: StatisticsSlice,
    operationByAIReducer:  OperationProcessingByAISlice,
});
