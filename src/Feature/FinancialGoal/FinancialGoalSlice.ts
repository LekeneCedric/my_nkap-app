import {createSlice} from "@reduxjs/toolkit";
import {IFinancialGoal} from "../../Domain/FinancialGoal/FinancialGoal.ts";
import {LoadingState} from "../../Domain/Enums/LoadingState.ts";

type FinancialGoalInitialState = {
    loadingState: LoadingState,
    financialGoals: IFinancialGoal[]
}
const initialState: FinancialGoalInitialState = {
    loadingState: LoadingState.idle,
    financialGoals: []
}
const FinancialGoalSlice = createSlice({
    name: 'financialGoalSlice',
    initialState: initialState,
    reducers: {

    }
});

export const {} = FinancialGoalSlice.actions;
export default FinancialGoalSlice.reducer;