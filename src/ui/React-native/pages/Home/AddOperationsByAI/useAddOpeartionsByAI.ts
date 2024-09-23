import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hook";
import { selectCategories } from "../../../../../Feature/Category/CategorySelector";
import { selectLoadingStateProcessingByAIOperations, selectProcessingByAIOperations } from "../../../../../Feature/AIOperations/ProcessingByAISelector";
import { LoadingState } from "../../../../../Domain/Enums/LoadingState";
import { OperationProcessingByAI } from "../../../../../Feature/AIOperations/Thunks/ProcessingByAI/ProcessingByAIResponse";
import { DeleteOperationAI } from "../../../../../Feature/AIOperations/ProcessingByAISlice";

interface useAddOperationsByAIBehaviour {
    loading: LoadingState,
    operations: OperationProcessingByAI[],
    deleteOperation: (operationId: string) => void,
}
const useAddOperationsByAI = (): useAddOperationsByAIBehaviour => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectLoadingStateProcessingByAIOperations);
    const operations = useAppSelector(selectProcessingByAIOperations);
    
    
    const deleteOperation = (operationId: string) => {
        dispatch(DeleteOperationAI(operationId))
    }

    useEffect(()=>{
        console.log('------')
        console.log(operations);
    }, [operations]);

    return {
        loading: loading,
        operations: operations,
        deleteOperation: deleteOperation,
    };
};

export default useAddOperationsByAI;