import {RootState} from "../../app/store.ts";


export const selectOperations = (state: RootState) => {
    return state.operationReducer.operations;
};

export const selectOperationLoadingState = (state: RootState) => {
    return state.operationReducer.loadingState;
};

export const selectCurrentOperationsPage = (state: RootState) => {
    return state.operationReducer.page;
};

export const selectCurrentOperationsLimit = (state: RootState) => {
    return state.operationReducer.limit;
}