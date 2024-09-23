import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingState } from "../../Domain/Enums/LoadingState";
import ProcessingOperationByAIAsync from "./Thunks/ProcessingByAI/ProcessingByAIAsync";
import IProcessingOperationByAIResponse, { OperationProcessingByAI } from "./Thunks/ProcessingByAI/ProcessingByAIResponse";
import AddOperationForm from "../../Infrastructure/Validators/Forms/operations/AddOperationForm";

type IInitialState = {
    loadingState: LoadingState,
    currentOperations: OperationProcessingByAI[],
}
const initialState: IInitialState = {
    currentOperations: [],
    loadingState: LoadingState.idle,
}
export const OperationProcessingByAISlice = createSlice({
    name: 'operation-processing-by-ai',
    initialState: initialState,
    reducers: {
        UpdateOperationAI: (state, {payload: {previousData, updatedData}}:PayloadAction<{previousData: OperationProcessingByAI, updatedData: AddOperationForm}>) => {
            state.currentOperations = state.currentOperations.map(op => {
                if (op.uuid == previousData.uuid) {
                    return {
                        ...op,
                        type: updatedData.type,
                        amount: updatedData.amount,
                        categoryId: updatedData.categoryId,
                        date: updatedData.date,
                        title: updatedData.details!,
                        accountId: updatedData.accountId,
                    }
                }
                return op;
            })
        },
        DeleteOperationAI: (state, {payload}:PayloadAction<string>) => {
            state.currentOperations = state.currentOperations.filter(operation => operation.uuid !== payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(ProcessingOperationByAIAsync.pending, (state) => {
                state.loadingState = LoadingState.pending;
            })
            .addCase(ProcessingOperationByAIAsync.rejected, (state) => {
                state.loadingState = LoadingState.failed;
            })
            .addCase(ProcessingOperationByAIAsync.fulfilled, (state, {payload}: PayloadAction<IProcessingOperationByAIResponse>) => {
                state.loadingState = LoadingState.success;
                console.log('payload ok');
                payload.data.map(newOp => {
                    let operationAlreadyExist = (state.currentOperations.find(existingOp => existingOp.uuid === newOp.uuid) !== undefined);
                    !operationAlreadyExist && (state.currentOperations = [...state.currentOperations, newOp]);
                })
            })
    }
});

export const {DeleteOperationAI, UpdateOperationAI} = OperationProcessingByAISlice.actions;

export default OperationProcessingByAISlice.reducer;