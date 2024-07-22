import {useState} from "react";
import {useForm, UseFormReturn} from "react-hook-form";
import IAddCategoryForm from "../../../../../../Infrastructure/Validators/Forms/Category/AddCategoryForm.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    AddCategoryFormSchemaValidate
} from "../../../../../../Infrastructure/Validators/Forms/Category/AddCategoryFormSchemaValidate.ts";
import {useAppDispatch, useAppSelector} from "../../../../../../app/hook.ts";
import {selectUser} from "../../../../../../Feature/Authentication/AuthenticationSelector.ts";
import SaveCategoryAsync from "../../../../../../Feature/Category/Thunks/Save/SaveCategoryAsync.ts";
import {useToast} from "react-native-toast-notifications";
import gatewayMessages from "../../../../../../Infrastructure/Shared/Gateways/constants/gatewayMessages.ts";
import {AddCategory} from "../../../../../../Feature/Category/CategorySlice.ts";
import {selectCategoryLoadingState} from "../../../../../../Feature/Category/CategorySelector.ts";
import {LoadingState} from "../../../../../../Domain/Enums/LoadingState.ts";

type useSelectCategoryModalViewBehaviour = {
    filterList: any[],
    sortList: (name: string) => void,
    form: UseFormReturn<IAddCategoryForm>,
    onSubmit: (data: IAddCategoryForm) => void,
    loading: LoadingState,
}
export const useSelectCategoryModalView = (initialList : any[]): useSelectCategoryModalViewBehaviour =>
{
    const userId = useAppSelector(selectUser)?.userId;
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectCategoryLoadingState);
    const toast = useToast();
    const form = useForm<IAddCategoryForm>({
        resolver: yupResolver(AddCategoryFormSchemaValidate)
    });
    const onSubmit = async (data: IAddCategoryForm) => {
        data.userId = userId;

        const response = await dispatch(SaveCategoryAsync({
            userId: userId!,
            name: data.name,
            icon: data.icon,
            color: data.color,
            description: data.description,
        }));
        if (SaveCategoryAsync.fulfilled.match(response)) {
            const categoryId = response.payload.categoryId;
            dispatch(AddCategory({
                id: categoryId,
                name: data.name,
                icon: data.icon,
                color: data.color,
                description: data.description,
            }));
            toast.show('Nouvelle catégorie ajouté avec succès !', {
                type: "success",
                placement: "top",
                duration: 3000,
                animationType: "slide-in",
            });
        }
        if (SaveCategoryAsync.rejected.match(response)) {
            // @ts-ignore
            toast.show(response.payload.message, {
                type: "danger",
                placement: "top",
                duration: 3000,
                animationType: "slide-in",
            });
        }
    }
    const [filterList, setFilterList] = useState<any[]>(initialList);
    const sortList = (name: string) => {
        if (name.length == 0) setFilterList(initialList);
        const newFilterList = initialList.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
        setFilterList(newFilterList);
    }
    return {
        filterList: filterList,
        sortList: sortList,
        form: form,
        onSubmit: onSubmit,
        loading: loading,
    }
}