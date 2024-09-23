import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../../../../../app/hook";
import IAccount from "../../../../../../../../Domain/Account/Account";
import ICategory from "../../../../../../../../Domain/Category/Category";
import { selectAccounts } from "../../../../../../../../Feature/Account/AccountSelector";
import { OperationProcessingByAI } from "../../../../../../../../Feature/AIOperations/Thunks/ProcessingByAI/ProcessingByAIResponse";
import { selectCategories } from "../../../../../../../../Feature/Category/CategorySelector";
import ISelectItem from "../../../../../../Components/Forms/Select/SelectItem";
import ISelectCategoryItem from "../../../../../../Components/Forms/SelectCategory/SelectCategoryItem";
import { AddOperationFormBehaviour } from "../../../../AddOperations/useAddOperationView";
import AddOperationForm from "../../../../../../../../Infrastructure/Validators/Forms/operations/AddOperationForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddOperationFormSchemaValidate } from "../../../../../../../../Infrastructure/Validators/Forms/operations/AddOperationFormSchemaValidate";
import { LoadingState } from "../../../../../../../../Domain/Enums/LoadingState";
import { DeleteOperationAI, UpdateOperationAI } from "../../../../../../../../Feature/AIOperations/ProcessingByAISlice";

interface UpdateOperationItemModalBehaviour {
    addOperationFormBehaviour: AddOperationFormBehaviour,
    accounts: ISelectItem[],
    categories: ISelectCategoryItem[],
    deleteOperation: () => void,
}
const useUpdateOperationItemModal = (data: OperationProcessingByAI, closeModal: () => void): UpdateOperationItemModalBehaviour => {
    const dispatch = useAppDispatch();
    const accounts = useAppSelector(selectAccounts);
    const categories = useAppSelector(selectCategories);
    const loadingState = LoadingState.idle;

    const form = useForm<AddOperationForm>({
        resolver: yupResolver(AddOperationFormSchemaValidate),
        values: {
            accountId: '',
            type: data.type,
            amount: data.amount,
            categoryId: data.categoryId,
            details: data.title,
            date: data.date
        }
    });

    const onSubmit = async (updatedData: AddOperationForm) => {
        dispatch(UpdateOperationAI({
            previousData: data,
            updatedData: updatedData
        }));
        closeModal();
    }

    const deleteOperation = () => {
        dispatch(DeleteOperationAI(data.uuid));
        closeModal();
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

export default useUpdateOperationItemModal;