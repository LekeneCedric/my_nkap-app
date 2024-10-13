import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../../../app/hook";
import ICategory from "../../../../../../../../Domain/Category/Category";
import { selectCategories, selectCategoryLoadingState } from "../../../../../../../../Feature/Category/CategorySelector";
import StringsOperations from "../../../../../../utils/StringsOperations";
import { useForm, UseFormReturn } from "react-hook-form";
import IAddCategoryForm from "../../../../../../../../Infrastructure/Validators/Forms/Category/AddCategoryForm";
import { LoadingState } from "../../../../../../../../Domain/Enums/LoadingState";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddCategoryFormSchemaValidate } from "../../../../../../../../Infrastructure/Validators/Forms/Category/AddCategoryFormSchemaValidate";
import { selectUser } from "../../../../../../../../Feature/Authentication/AuthenticationSelector";
import SaveCategoryAsync from "../../../../../../../../Feature/Category/Thunks/Save/SaveCategoryAsync";
import { AddCategory } from "../../../../../../../../Feature/Category/CategorySlice";
import { useToast } from "react-native-toast-notifications";

interface behaviour {
    filteredCategories: ICategory[],
    searchText: string,
    setSearchText: Dispatch<SetStateAction<string>>,
    showAddCategoryModal: boolean,
    openAddCategoryModal: () => void,
    closeAddCAtegoryModal: () => void,
    form: UseFormReturn<IAddCategoryForm>,
    onSubmit: (data: IAddCategoryForm) => void,
    loading: LoadingState,
}
const useCategories = (): behaviour => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const [filterCategories, setFilterCategories] = useState<ICategory[]>(categories);
    const {normalizeString} = StringsOperations();
    const [searchText, setSearchText] = useState<string>("");
    const [showAddCategoryModal, setShowAddCategoryModal] = useState<boolean>(false);
    const userId = useAppSelector(selectUser)?.userId;
    const loading = useAppSelector(selectCategoryLoadingState);
    const form = useForm<IAddCategoryForm>({
        resolver: yupResolver(AddCategoryFormSchemaValidate)
    });
    const toast = useToast();

    const openAddCategoryModal = () => {setShowAddCategoryModal(true)}
    const closeAddCategoryModal = () => {setShowAddCategoryModal(false)}

    

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
            form.reset();
            setSearchText("");
            console.log(response.payload.message);

            const categoryId = response.payload.categoryId;
            dispatch(AddCategory({
                id: categoryId,
                name: data.name,
                icon: data.icon,
                color: data.color,
                description: data.description,
            }));
            closeAddCategoryModal();

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
                placement: "bottom",
                duration: 3000,
                animationType: "slide-in",
                swipeEnabled: true,

            });

        }
    }
    useEffect(() => {
        const filteredCategories = categories.filter(c => {
            const stringMatches = normalizeString(c.name).includes(normalizeString(searchText));
            const searchIsEmpty = searchText.length == 0;
            if (stringMatches || searchIsEmpty)
                return c;
        });
        setFilterCategories(filteredCategories);
    }, [categories, searchText]);

    return {
        searchText: searchText,
        setSearchText: setSearchText,
        filteredCategories: filterCategories,
        showAddCategoryModal: showAddCategoryModal,
        openAddCategoryModal: openAddCategoryModal,
        closeAddCAtegoryModal: closeAddCategoryModal,
        form: form,
        loading: loading,
        onSubmit: onSubmit,
    }
};

export default useCategories;