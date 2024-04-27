import { RootState } from "../../app/store";

export const selectProfessions = (state: RootState) => {
    return state.professionReducer.professions;
}

export const selectLoadingProfessionState = (state: RootState) => {
    return state.professionReducer.loading;
}