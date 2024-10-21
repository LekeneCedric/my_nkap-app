import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../../app/hook";
import {selectCategories} from "../../../../../Feature/Category/CategorySelector";
import {
  selectLoadingStateProcessingByAIOperations,
  selectProcessingByAIOperations,
} from "../../../../../Feature/AIOperations/ProcessingByAISelector";
import {LoadingState} from "../../../../../Domain/Enums/LoadingState";
import {OperationProcessingByAI} from "../../../../../Feature/AIOperations/Thunks/ProcessingByAI/ProcessingByAIResponse";
import {DeleteOperationAI} from "../../../../../Feature/AIOperations/ProcessingByAISlice";
import SaveManyOperationsAsync from "../../../../../Feature/AIOperations/Thunks/SaveMany/SaveManyOperationsAsync";
import ISaveManyOperationsCommand from "../../../../../Feature/AIOperations/Thunks/SaveMany/SaveManyOperationsCommand";
import {useToast} from "react-native-toast-notifications";
import useCustomTranslation from "../../../Shared/Hooks/useCustomTranslation";
import {useNavigation} from "@react-navigation/native";
import IOperationDto from "../../../../../Domain/Operation/IOperationDto";
import {AddOperation} from "../../../../../Feature/Operations/OperationSlice";
import {UpdateAccountByAddingOperation} from "../../../../../Feature/Account/AccountSlice";
import {UpdateFinancialGoalAfterSaveOperation} from "../../../../../Feature/FinancialGoal/FinancialGoalSlice";
import { selectUserToken } from "../../../../../Feature/Authentication/AuthenticationSelector";

interface useAddOperationsByAIBehaviour {
  loading: LoadingState;
  operations: OperationProcessingByAI[];
  deleteOperation: (operationId: string) => void;
  addOperation: () => void;
  operationIsComplete: boolean;
  aiLeftToken: number
}
const useAddOperationsByAI = (): useAddOperationsByAIBehaviour => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoadingStateProcessingByAIOperations);
  const operations = useAppSelector(selectProcessingByAIOperations);
  const aiLeftToken = useAppSelector(selectUserToken);
  const {translate} = useCustomTranslation();
  const {goBack} = useNavigation();
  const operationsIsComplete =
    operations.length > 0 &&
    operations.find(op => op.accountId === undefined) === undefined;
  const categories = useAppSelector(selectCategories);

  const deleteOperation = (operationId: string) => {
    dispatch(DeleteOperationAI(operationId));
  };

  const addOperations = async () => {
    const operationsToAdd = [...operations];
    const command: ISaveManyOperationsCommand = {
      operations: operations.map(op => {
        return {
          accountId: op.accountId!,
          type: op.type,
          amount: op.amount,
          categoryId: op.categoryId,
          date: op.date + ":00",
          detail: op.title,
        };
      }),
    };
    const response = await dispatch(SaveManyOperationsAsync(command));
    if (SaveManyOperationsAsync.fulfilled.match(response)) {
      toast.show(translate("operations-added"), {
        type: "success",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
      });
      const operationIds = response.payload.operationIds;
      operationsToAdd.map(
        (operation: OperationProcessingByAI, index: number) => {
          const opCategory = categories.find(c => c.id == operation.categoryId);
          const newOperation: IOperationDto = {
            type: operation.type,
            accountId: operation.accountId!,
            date: operation.date,
            details: operation.title,
            categoryId: operation.categoryId,
            amount: operation.amount,
            categoryName: opCategory!.name!,
            categoryIcon: opCategory!.icon!,
            categoryColor: opCategory!.color!,
            id: operationIds[index],
          };
          dispatch(AddOperation(newOperation));
          dispatch(
            UpdateAccountByAddingOperation({
              accountId: operation.accountId!,
              type: operation.type,
              amount: operation.amount,
            }),
          );
          dispatch(
            UpdateFinancialGoalAfterSaveOperation({
              accountId: operation.accountId!,
              amount: operation.amount,
              type: operation.type,
              date: operation.date,
              isUpdate: false,
              previousAmount: 0,
            }),
          );
        },
      );
      goBack();
    }
    if (SaveManyOperationsAsync.rejected.match(response)) {
      //@ts-ignore
      toast.show(response.payload.message, {
        type: "danger",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
      });
    }
  };
  
  return {
    loading: loading,
    operations: operations,
    deleteOperation: deleteOperation,
    addOperation: addOperations,
    operationIsComplete: operationsIsComplete,
    aiLeftToken: aiLeftToken,
  };
};

export default useAddOperationsByAI;
