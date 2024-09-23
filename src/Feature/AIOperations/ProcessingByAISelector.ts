import { RootState } from "../../app/store";

export const selectProcessingByAIOperations = (state: RootState) => {
    return state.operationByAIReducer.currentOperations;
}

export const selectLoadingStateProcessingByAIOperations = (state: RootState) => {
    return state.operationByAIReducer.loadingState;
}