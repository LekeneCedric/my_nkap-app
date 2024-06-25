import {RootState} from "../../app/store.ts";

export const selectCurrentTheme = (state: RootState) => {
    return state.configurationReducer.theme;
};

export const selectCanSeeAmount = (state: RootState) => {
    return state.configurationReducer.canSeeAmount;
}