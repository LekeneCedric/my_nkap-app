import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hook";
import { selectCategories } from "../../../../../Feature/Category/CategorySelector";
import { selectLoadingStateProcessingByAIOperations, selectProcessingByAIOperations } from "../../../../../Feature/AIOperations/ProcessingByAISelector";
import { LoadingState } from "../../../../../Domain/Enums/LoadingState";
import { OperationProcessingByAI } from "../../../../../Feature/AIOperations/Thunks/ProcessingByAI/ProcessingByAIResponse";
import { DeleteOperationAI } from "../../../../../Feature/AIOperations/ProcessingByAISlice";
import SaveManyOperationsAsync from "../../../../../Feature/AIOperations/Thunks/SaveMany/SaveManyOperationsAsync";
import ISaveManyOperationsCommand from "../../../../../Feature/AIOperations/Thunks/SaveMany/SaveManyOperationsCommand";
import { useToast } from "react-native-toast-notifications";
import useCustomTranslation from "../../../Shared/Hooks/useCustomTranslation";
import { useNavigation } from "@react-navigation/native";

interface useAddOperationsByAIBehaviour {
    loading: LoadingState,
    operations: OperationProcessingByAI[],
    deleteOperation: (operationId: string) => void,
    addOperation: () => void,
    operationIsComplete: boolean,
}
const useAddOperationsByAI = (): useAddOperationsByAIBehaviour => {
    const toast = useToast();
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectLoadingStateProcessingByAIOperations);
    const operations = useAppSelector(selectProcessingByAIOperations);
    const {translate} = useCustomTranslation();
    const {goBack} = useNavigation();
    const operationsIsComplete = operations.length > 0 && operations.find(op => op.accountId === undefined) === undefined;
    
    
    const deleteOperation = (operationId: string) => {
        dispatch(DeleteOperationAI(operationId))
    }

    const addOperations = async () => {
        const command: ISaveManyOperationsCommand = {
            operations: operations.map(op => {
                return {
                    accountId: op.accountId!,
                    type: op.type,
                    amount: op.amount,
                    categoryId: op.categoryId,
                    date: op.date+':00',
                    detail: op.title
                }
            })
        }
        const response = await dispatch(SaveManyOperationsAsync(command));
        if (SaveManyOperationsAsync.fulfilled.match(response)) {
            toast.show(translate('operations-added'), {
                type: 'success',
                placement: "top",
                duration: 3000,
                animationType: "slide-in",
            });
            goBack();
        }
        if (SaveManyOperationsAsync.rejected.match(response)) {
            toast.show(response.payload.message, {
                type: 'danger',
                placement: "top",
                duration: 3000,
                animationType: "slide-in",
            });
        }
    }
    useEffect(()=>{
        console.log('------')
        console.log(operations);
    }, [operations]);

    return {
        loading: loading,
        operations: operations,
        deleteOperation: deleteOperation,
        addOperation: addOperations,
        operationIsComplete: operationsIsComplete
    };
};

export default useAddOperationsByAI;