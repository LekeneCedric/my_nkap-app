import {RootState} from "../../app/store.ts";

export const selectCurrentTheme = (state: RootState) => {
    return state.configurationReducer.theme;
}