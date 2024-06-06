import {LoadingState} from "../../Domain/Enums/LoadingState.ts";
import ICategory from "../../Domain/Category/Category.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import GetAllCategoryAsync from "./Thunks/GetAll/GetAllCategoryAsync.ts";
import IGetAllCategoryResponse from "./Thunks/GetAll/GetAllCategoryResponse.ts";

interface initialState {
    loadingState: LoadingState,
    categories: ICategory[],
}

const initialState: initialState = {
    loadingState: LoadingState.idle,
    categories: [],
}

export const CategorySlice = createSlice({
        name: 'categorySlice',
        initialState: initialState,
        reducers: {},
        extraReducers: builder => {
            builder
                .addCase(GetAllCategoryAsync.pending, state => {
                    state.loadingState = LoadingState.pending;
                })
                .addCase(GetAllCategoryAsync.fulfilled, (
                    state,
                    {payload}:PayloadAction<IGetAllCategoryResponse>) => {
                    state.loadingState = LoadingState.success;
                    state.categories = payload.categories;
                })
                .addCase(GetAllCategoryAsync.rejected, state => {
                    state.loadingState = LoadingState.failed;
                });
        }
    }
);
export const {} = CategorySlice.actions;
export default CategorySlice.reducer;