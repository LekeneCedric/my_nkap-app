import IOperationDto from "../../../../../Domain/Operation/IOperationDto.ts";
import {useAppDispatch, useAppSelector} from "../../../../../app/hook.ts";
import {useToast} from "react-native-toast-notifications";
import {selectUser} from "../../../../../Feature/Authentication/AuthenticationSelector.ts";
import {selectAccounts} from "../../../../../Feature/Account/AccountSelector.ts";
import {selectCategories} from "../../../../../Feature/Category/CategorySelector.ts";
import {selectOperationLoadingState} from "../../../../../Feature/Operations/OperationsSelector.ts";
import {useForm} from "react-hook-form";
import AddOperationForm from "../../../../../Infrastructure/Validators/Forms/operations/AddOperationForm.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    AddOperationFormSchemaValidate
} from "../../../../../Infrastructure/Validators/Forms/operations/AddOperationFormSchemaValidate.ts";
import IAccount from "../../../../../Domain/Account/Account.ts";
import ISelectItem from "../../Forms/Select/SelectItem.ts";
import ICategory from "../../../../../Domain/Category/Category.ts";
import ISelectCategoryItem from "../../Forms/SelectCategory/SelectCategoryItem.ts";
import {useEffect} from "react";
import IGetAllCategoryCommand from "../../../../../Feature/Category/Thunks/GetAll/GetAllCategoryCommand.ts";
import GetAllCategoryAsync from "../../../../../Feature/Category/Thunks/GetAll/GetAllCategoryAsync.ts";
import {AddOperationFormBehaviour} from "../../../pages/Home/AddOperations/useAddOperationView.ts";
import IOperation, {IOperationTypeEnum} from "../../../../../Domain/Operation/Operation.ts";
import SaveOperationAsync from "../../../../../Feature/Operations/Thunks/Save/SaveOperationAsync.ts";
import useNavigation from "../../../utils/useNavigation.ts";
import {UpdateOperation} from "../../../../../Feature/Operations/OperationSlice.ts";
import {
    UpdateAccountByAddingOperation, UpdateAccountByRemovingOperation
} from "../../../../../Feature/Account/AccountSlice.ts";
import DeleteOperationAsync from "../../../../../Feature/Operations/Thunks/Delete/DeleteOperationAsync.ts";
import IDeleteOperationCommand from "../../../../../Feature/Operations/Thunks/Delete/IDeleteOperationCommand.ts";
import {UpdateFinancialGoalAfterSaveOperation} from "../../../../../Feature/FinancialGoal/FinancialGoalSlice.ts";
import { selectCurrency } from "../../../../../Feature/Configuration/ConfigurationSelector.ts";

interface useUpdateOperationModalViewBehaviour{
    addOperationFormBehaviour: AddOperationFormBehaviour,
    accounts: ISelectItem[],
    categories: ISelectCategoryItem[],
    deleteOperation: () => void,
}
const useUpdateOperationModalView = (toUpdateOperation: IOperationDto): useUpdateOperationModalViewBehaviour => {
    const dispatch = useAppDispatch();
    const currency = useAppSelector(selectCurrency);
    const toast = useToast();
    const userId = useAppSelector(selectUser)?.userId;
    const accounts = useAppSelector(selectAccounts);
    const categories = useAppSelector(selectCategories);
    const loadingState = useAppSelector(selectOperationLoadingState);
    const {goBack} = useNavigation();
    const form = useForm<AddOperationForm>({
        resolver: yupResolver(AddOperationFormSchemaValidate),
        values: {
            operationId: toUpdateOperation.id,
            accountId: toUpdateOperation.accountId,
            type: toUpdateOperation.type,
            amount: toUpdateOperation.amount,
            categoryId: toUpdateOperation.categoryId,
            details: toUpdateOperation.details,
            date: toUpdateOperation.date
        }
    });
    const onSubmit = async (data: AddOperationForm) => {
        const operationDetails = data.details ? data.details : `
            ${data.type == IOperationTypeEnum.EXPENSE ? 'Dépense' : 'Revenu'} de ${data.amount} ${currency?.currency ?? ''}
            `;
        const operation: IOperation = {
            id: data.operationId,
            accountId: data.accountId,
            type: data.type,
            amount: data.amount,
            categoryId: data.categoryId,
            date: data.date + ':00',
            detail: operationDetails,
        }
        const response = await dispatch(SaveOperationAsync({...operation, operationId: data.operationId, previousAmount: toUpdateOperation.amount}));
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
            const category = categories.find(c => c.id == data.categoryId);
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
            }
            dispatch(UpdateOperation(newOperation));
            dispatch(UpdateAccountByRemovingOperation({
                accountId: toUpdateOperation.accountId,
                type: toUpdateOperation.type,
                amount: toUpdateOperation.amount,
            }));
            dispatch(UpdateAccountByAddingOperation({
                accountId: data.accountId,
                type: data.type,
                amount: data.amount,
            }));
            dispatch(UpdateFinancialGoalAfterSaveOperation({
                accountId: data.accountId,
                amount: data.amount,
                type: data.type,
                date: data.date,
                isUpdate: true,
                previousAmount: toUpdateOperation.amount,
            }));
            goBack();
        }
    }
    const deleteOperation = async () => {
        
        const command: IDeleteOperationCommand = {
            accountId: toUpdateOperation.accountId,
            operationId: toUpdateOperation.id,
        }
        const response = await dispatch(DeleteOperationAsync(command));
        if (DeleteOperationAsync.rejected.match(response)) {
            // @ts-ignore
            toast.show(response.payload.message, {
                type: "danger",
                placement: "top",
                duration: 3000,
                animationType: "slide-in",
            });
        }
        if (DeleteOperationAsync.fulfilled.match(response)) {
            dispatch(UpdateAccountByRemovingOperation({
                accountId: toUpdateOperation.accountId,
                type: toUpdateOperation.type,
                amount: toUpdateOperation.amount,
            }));
            dispatch(UpdateFinancialGoalAfterSaveOperation({
                accountId: toUpdateOperation.accountId,
                amount: toUpdateOperation.amount,
                type: toUpdateOperation.type,
                date: toUpdateOperation.date,
                isUpdate: false,
                isDelete: true,
                previousAmount: toUpdateOperation.amount,
            }))
            goBack();
        }

    }
    const accountsSelectItems = accounts.map((ac: IAccount): ISelectItem => {
        return {
            id: ac.id,
            icon: ac.icon,
            name: ac.name,
            color: ac.color,
        }
    });

    const categoriesSelectItems = categories.map((ca: ICategory): ISelectCategoryItem => {
        return {
            id: ca.id,
            icon: ca.icon,
            name: ca.name,
            color: ca.color,
            description: ca.description
        }
    });

    useEffect(() => {
        const getAllCategories = async () => {
            const command = {
                userId: userId ? userId : '',
            } as IGetAllCategoryCommand;
            await dispatch(GetAllCategoryAsync(command));
        }
        if (categories.length == 0) {
            getAllCategories().then(() => null);
        }
    }, [])
    return {
        addOperationFormBehaviour: {
            form: form,
            onSubmit: onSubmit,
            loadingState: loadingState,
        },
        accounts: accountsSelectItems,
        categories: categoriesSelectItems,
        deleteOperation: deleteOperation,
    }
};

export default useUpdateOperationModalView;