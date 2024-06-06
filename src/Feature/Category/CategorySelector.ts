import {RootState} from "../../app/store.ts";

export const selectCategories = (state: RootState) => {
    return state.categoryReducer.categories;
}