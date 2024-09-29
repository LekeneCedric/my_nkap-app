import {LoadingState} from "../../Domain/Enums/LoadingState.ts";
import ICategory from "../../Domain/Category/Category.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import GetAllCategoryAsync from "./Thunks/GetAll/GetAllCategoryAsync.ts";
import IGetAllCategoryResponse from "./Thunks/GetAll/GetAllCategoryResponse.ts";
import SaveCategoryAsync from "./Thunks/Save/SaveCategoryAsync.ts";
import ISaveCategoryResponse from "./Thunks/Save/SaveCategoryResponse.ts";

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
        reducers: {
            AddCategory: (state, {payload}: PayloadAction<ICategory>) => {
                state.categories = [
                    ...state.categories,
                    payload,
                ]
            },
            UpdateCategory: (state, {payload}: PayloadAction<ICategory>) => {
                const updatedCategories = state.categories.map(c => {
                    if (c.id == payload.id) {
                        return payload;
                    }
                    return c;
                });
                state.categories = [...updatedCategories];
            }
        },
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
            builder
                .addCase(SaveCategoryAsync.pending, state => {
                    state.loadingState = LoadingState.pending;
                })
                .addCase(SaveCategoryAsync.fulfilled, (state, {payload}: PayloadAction<ISaveCategoryResponse>) => {
                    state.loadingState = LoadingState.success;
                })
                .addCase(SaveCategoryAsync.rejected, state => {
                    state.loadingState = LoadingState.failed;
                })
        }
    }
);
export const {AddCategory, UpdateCategory} = CategorySlice.actions;
export default CategorySlice.reducer;