import {useForm, UseFormReturn} from "react-hook-form";
import AddOperationForm from "../../../../../Infrastructure/Validators/Forms/operations/AddOperationForm.ts";
import {LoadingState} from "../../../../../Domain/Enums/LoadingState.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {AddOperationFormSchemaValidate} from "../../../../../Infrastructure/Validators/Forms/operations/AddOperationFormSchemaValidate.ts";
import {useAppDispatch, useAppSelector} from "../../../../../app/hook.ts";
import {selectOperationLoadingState} from "../../../../../Feature/Operations/OperationsSelector.ts";
import ISelectItem from "../../../Components/Forms/Select/SelectItem.ts";
import {selectAccounts} from "../../../../../Feature/Account/AccountSelector.ts";
import IAccount from "../../../../../Domain/Account/Account.ts";
import {useEffect, useState} from "react";
import {
  selectCategories,
} from "../../../../../Feature/Category/CategorySelector.ts";
import {selectUser} from "../../../../../Feature/Authentication/AuthenticationSelector.ts";
import IGetAllCategoryCommand from "../../../../../Feature/Category/Thunks/GetAll/GetAllCategoryCommand.ts";
import GetAllCategoryAsync from "../../../../../Feature/Category/Thunks/GetAll/GetAllCategoryAsync.ts";
import ISelectCategoryItem from "../../../Components/Forms/SelectCategory/SelectCategoryItem.ts";
import ICategory from "../../../../../Domain/Category/Category.ts";
import SaveOperationAsync from "../../../../../Feature/Operations/Thunks/Save/SaveOperationAsync.ts";
import {useToast} from "react-native-toast-notifications";
import IOperation, {
  IOperationTypeEnum,
} from "../../../../../Domain/Operation/Operation.ts";
import IOperationDto from "../../../../../Domain/Operation/IOperationDto.ts";
import {AddOperation} from "../../../../../Feature/Operations/OperationSlice.ts";
import {UpdateAccountByAddingOperation} from "../../../../../Feature/Account/AccountSlice.ts";
import useNavigation from "../../../utils/useNavigation.ts";
import {
  UpdateFinancialGoalAfterSaveOperation,
} from "../../../../../Feature/FinancialGoal/FinancialGoalSlice.ts";
import useCustomTranslation from "../../../Shared/Hooks/useCustomTranslation.ts";
import { selectCurrency } from "../../../../../Feature/Configuration/ConfigurationSelector.ts";

export interface AddOperationFormBehaviour {
  form: UseFormReturn<AddOperationForm>;
  onSubmit: (operation: AddOperationForm) => void;
  loadingState: LoadingState;
}

interface UseAddOperationViewBehaviour {
  addOperationFormBehaviour: AddOperationFormBehaviour;
  accounts: ISelectItem[];
  categories: ISelectCategoryItem[];
}

const useAddOperationView = (): UseAddOperationViewBehaviour => {
  const currency = useAppSelector(selectCurrency);
  const {translate} = useCustomTranslation();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const userId = useAppSelector(selectUser)?.userId;
  const accountsSelectItems = useAppSelector(selectAccounts).map(
    (ac: IAccount): ISelectItem => {
      return {
        id: ac.id,
        icon: ac.icon,
        name: ac.name,
        color: ac.color,
      };
    },
  );
  const categories = useAppSelector(selectCategories);
  const categoriesSelectItems = useAppSelector(selectCategories).map(
    (ca: ICategory): ISelectCategoryItem => {
      return {
        id: ca.id,
        icon: ca.icon,
        name: ca.name,
        color: ca.color,
        description: ca.description,
      };
    },
  );
  const loadingState = useAppSelector(selectOperationLoadingState);
  const form = useForm<AddOperationForm>({
    resolver: yupResolver(AddOperationFormSchemaValidate),
  });
  const {navigateByPath} = useNavigation();
  const onSubmit = async (data: AddOperationForm) => {
    const operationDetails = data.details
      ? data.details
      : `${data.type == IOperationTypeEnum.EXPENSE? translate('expense'): translate('income')} ${translate('of')} ${data.amount} ${currency?.currency ?? ''}`;
    const operation: IOperation = {
      accountId: data.accountId,
      type: data.type,
      amount: data.amount,
      categoryId: data.categoryId,
      date: data.date + ':00',
      detail: operationDetails,
    };
    const response = await dispatch(SaveOperationAsync(operation));
    if (SaveOperationAsync.rejected.match(response)) {
      // @ts-ignore
      toast.show(response.payload.message, {
        type: "danger",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
      });
    }
    if (SaveOperationAsync.fulfilled.match(response)) {
      const operationId = response.payload.operationId;
      const category = categories.find((c: ICategory) => c.id == data.categoryId);
      const newOperation: IOperationDto = {
        type: data.type,
        id: operationId,
        accountId: data.accountId,
        date: data.date,
        details: operationDetails,
        categoryId: data.categoryId,
        amount: data.amount,
        categoryName: category?.name!,
        categoryIcon: category?.icon!,
        categoryColor: category?.color!,
      };
      navigateByPath("transactions");
      dispatch(AddOperation(newOperation));
      dispatch(
        UpdateAccountByAddingOperation({
          accountId: data.accountId,
          type: data.type,
          amount: data.amount,
        }),
      );
      dispatch(
        UpdateFinancialGoalAfterSaveOperation({
          accountId: data.accountId,
          amount: data.amount,
          type: data.type,
          date: data.date,
          isUpdate: false,
          previousAmount: 0,
        }),
      );
    }
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const command = {
        userId: userId ? userId : "",
      } as IGetAllCategoryCommand;
      await dispatch(GetAllCategoryAsync(command));
    };
    if (categories.length == 0) {
      getAllCategories();
    }
  }, []);
  return {
    addOperationFormBehaviour: {
      form: form,
      onSubmit: onSubmit,
      loadingState: loadingState,
    },
    accounts: accountsSelectItems,
    categories: categoriesSelectItems,
  };
};
export default useAddOperationView;
