import {useForm, UseFormReturn} from "react-hook-form";
import AddOperationForm from "../../../../../Infrastructure/Validators/Forms/operations/AddOperationForm.ts";
import {LoadingState} from "../../../../../Domain/Enums/LoadingState.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    AddOperationFormSchemaValidate
} from "../../../../../Infrastructure/Validators/Forms/operations/AddOperationFormSchemaValidate.ts";
import {useAppDispatch, useAppSelector} from "../../../../../app/hook.ts";
import {selectOperationLoadingState} from "../../../../../Feature/Operations/OperationsSelector.ts";
import ISelectItem from "../../../../Components/Forms/Select/SelectItem.ts";
import {selectAccounts} from "../../../../../Feature/Account/AccountSelector.ts";
import IAccount from "../../../../../Domain/Account/Account.ts";
import {useEffect, useState} from "react";
import {selectCategories} from "../../../../../Feature/Category/CategorySelector.ts";
import {selectUser} from "../../../../../Feature/Authentication/AuthenticationSelector.ts";
import IGetAllCategoryCommand from "../../../../../Feature/Category/Thunks/GetAll/GetAllCategoryCommand.ts";
import GetAllCategoryAsync from "../../../../../Feature/Category/Thunks/GetAll/GetAllCategoryAsync.ts";
import ISelectCategoryItem from "../../../../Components/Forms/SelectCategory/SelectCategoryItem.ts";
import ICategory from "../../../../../Domain/Category/Category.ts";

export interface AddOperationFormBehaviour {
    form: UseFormReturn<AddOperationForm>,
    onSubmit: (operation: AddOperationForm) => void,
    loadingState: LoadingState,
}
interface UseAddOperationViewBehaviour {
    addOperationFormBehaviour: AddOperationFormBehaviour,
    accounts: ISelectItem[],
    categories: ISelectCategoryItem[],
}
const useAddOperationView = (): UseAddOperationViewBehaviour => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector(selectUser)?.userId;
    const accounts = useAppSelector(selectAccounts);
    const categories = useAppSelector(selectCategories);
    const loadingState = useAppSelector(selectOperationLoadingState);
    const form = useForm<AddOperationForm>({
        resolver: yupResolver(AddOperationFormSchemaValidate),
    });
    const onSubmit = async (data: AddOperationForm) => {
        //
    }
    const accountsSelectItems = accounts.map((ac: IAccount):ISelectItem => {
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
    })
    useEffect(() => {
        const getAllCategories = async () => {
            const command= {
                userId: userId?userId:'',
            } as IGetAllCategoryCommand;
            await dispatch(GetAllCategoryAsync(command));
        }
        if (categories.length == 0) {
            getAllCategories();
        }
    },[])
    return {
        addOperationFormBehaviour: {
            form: form,
            onSubmit: onSubmit,
            loadingState: loadingState,
        },
        accounts: accountsSelectItems,
        categories: categoriesSelectItems,
    }
};
export default useAddOperationView;