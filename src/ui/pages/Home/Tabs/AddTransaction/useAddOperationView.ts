import {useForm, UseFormReturn} from "react-hook-form";
import AddOperationForm from "../../../../../Infrastructure/Validators/Forms/operations/AddOperationForm.ts";
import {LoadingState} from "../../../../../Domain/Enums/LoadingState.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    AddOperationFormSchemaValidate
} from "../../../../../Infrastructure/Validators/Forms/operations/AddOperationFormSchemaValidate.ts";
import {useAppSelector} from "../../../../../app/hook.ts";
import {selectOperationLoadingState} from "../../../../../Feature/Operations/OperationsSelector.ts";
import ISelectItem from "../../../../Components/Forms/Select/SelectItem.ts";
import {selectAccounts} from "../../../../../Feature/Account/AccountSelector.ts";
import IAccount from "../../../../../Domain/Account/Account.ts";

export interface AddOperationFormBehaviour {
    form: UseFormReturn<AddOperationForm>,
    onSubmit: (operation: AddOperationForm) => void,
    loadingState: LoadingState,
}
interface UseAddOperationViewBehaviour {
    addOperationFormBehaviour: AddOperationFormBehaviour,
    accounts: ISelectItem[]
}
const useAddOperationView = (): UseAddOperationViewBehaviour => {
    const accounts = useAppSelector(selectAccounts);
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
    return {
        addOperationFormBehaviour: {
            form: form,
            onSubmit: onSubmit,
            loadingState: loadingState,
        },
        accounts: accountsSelectItems,
    }
};
export default useAddOperationView;