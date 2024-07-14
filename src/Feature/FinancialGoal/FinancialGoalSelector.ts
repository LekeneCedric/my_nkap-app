import {RootState} from "../../app/store.ts";

export const financialGoals = (state: RootState) => {
    return state.financialGoalReducer.financialGoals;
}