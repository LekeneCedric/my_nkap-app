import {RootState} from "../../app/store.ts";

export const selectCategories = (state: RootState) => {
    return state.categoryReducer.categories;
}

export const selectCategoryLoadingState = (state: RootState) => {
    return state.categoryReducer.loadingState;
}
export const selectCategory = (state: RootState, id: string) => {
    return state.categoryReducer.categories.find(c => c.id = id);
}