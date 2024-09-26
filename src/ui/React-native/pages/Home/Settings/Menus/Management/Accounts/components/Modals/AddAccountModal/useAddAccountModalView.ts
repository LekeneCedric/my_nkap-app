import {useForm, UseFormReturn} from "react-hook-form";
import AddAccountForm from "../../../../../../../../../../../Infrastructure/Validators/Forms/account/AddAccountForm";
import { LoadingState } from "../../../../../../../../../../../Domain/Enums/LoadingState";
import { useAppDispatch, useAppSelector } from "../../../../../../../../../../../app/hook";
import { useToast } from "react-native-toast-notifications";
import { selectUser } from "../../../../../../../../../../../Feature/Authentication/AuthenticationSelector";
import { yupResolver } from "@hookform/resolvers/yup";
import { selectAccountLoadingState } from "../../../../../../../../../../../Feature/Account/AccountSelector";
import { AddAccountFormSchemaValidate } from "../../../../../../../../../../../Infrastructure/Validators/Forms/account/AddAccountFormSchemaValidate";
import DeleteAccountAsync from "../../../../../../../../../../../Feature/Account/Thunks/Delete/DeleteAccountAsync";
import { DeleteOperationsRelatedToAccount } from "../../../../../../../../../../../Feature/Operations/OperationSlice";
import ISaveAccountCommand from "../../../../../../../../../../../Feature/Account/Thunks/Save/SaveAccountCommand";
import { SaveAccountAsync } from "../../../../../../../../../../../Feature/Account/Thunks/Save/SaveAccountAsync";
import IAccount from "../../../../../../../../../../../Domain/Account/Account";
import { AddAccount, UpdateAccount } from "../../../../../../../../../../../Feature/Account/AccountSlice";

export interface AddAccountFormBehaviour {
    form: UseFormReturn<AddAccountForm>,
    onSubmit: (account: AddAccountForm) => void,
    loadingState: LoadingState,
}

interface useAddAccountModalViewBehaviour {
    addAccountFormBehaviour: AddAccountFormBehaviour,
    onDeleteAccount: () => void,
}

const useAddAccountModalView = (closeModal: () => void, isUpdate?: boolean, account?: IAccount, ): useAddAccountModalViewBehaviour => {
    const dispatch = useAppDispatch();
    const toast = useToast();
    const userId = useAppSelector(selectUser)!.userId
    const loadingState = useAppSelector(selectAccountLoadingState);
    const form = !isUpdate ? useForm<AddAccountForm>({
        resolver: yupResolver(AddAccountFormSchemaValidate),
        defaultValues: {userId: userId},
    }) :useForm<AddAccountForm>({
        resolver: yupResolver(AddAccountFormSchemaValidate),
        defaultValues: {userId: userId},
        values: {
            userId: userId,
            accountId: account?.id,
            type: account?.type!,
            balance: account?.balance!,
            name: account?.name!,
            color: account?.color!,
            icon: account?.icon!,
            isIncludeInTotalBalance: account?.isIncludeInTotalBalance == 1
        }
    }) ;
    const onDeleteAccount = async () => {
        const response = await dispatch(
            DeleteAccountAsync({accountId: account?.id!})
        );
        if (DeleteAccountAsync.rejected.match(response)) {
            //@ts-ignore
            toast.show(response.payload.message, {
                type: "danger",
                placement: "top",
                duration: 3000,
                animationType: "slide-in",
            });
        }
        if (DeleteAccountAsync.fulfilled.match(response)) {
            dispatch(DeleteOperationsRelatedToAccount({accountId: account!.id}));
            closeModal();
        }
    }
    const onSubmit = async (data: AddAccountForm) => {
        form.reset();
        const command = {
            userId: data.userId,
            name: data.name,
            type: data.type,
            icon: data.icon,
            color: data.color,
            balance: data.balance,
            isIncludeInTotalBalance: data.isIncludeInTotalBalance
        } as ISaveAccountCommand;
        if (isUpdate) {
            command.accountId = data.accountId;
        }
        const response = await dispatch(
            SaveAccountAsync(command)
        );
        if (SaveAccountAsync.rejected.match(response)) {
            //@ts-ignore
            toast.show(response.payload.message, {
                type: "danger",
                placement: "top",
                duration: 3000,
                animationType: "slide-in",
            });
        }
        if (SaveAccountAsync.fulfilled.match(response)) {
            const accountId = response.payload.accountId;
            const newAccount: IAccount = {
                id: accountId,
                name: data.name,
                type: data.type,
                totalExpenses: 0,
                totalIncomes: 0,
                balance: data.balance,
                isIncludeInTotalBalance: data.isIncludeInTotalBalance ? 1 : 0,
                color: data.color,
                icon: data.icon,
            }
            if (!isUpdate) {
                dispatch(AddAccount(newAccount));
            }
            if (isUpdate) {
                dispatch(UpdateAccount({
                    ...newAccount,
                    id: data.accountId!,
                }));
            }
            closeModal();
        }
    }
    return {
        addAccountFormBehaviour: {
            form: form,
            onSubmit: onSubmit,
            loadingState: loadingState,
        },
        onDeleteAccount: onDeleteAccount,
    }
};
export default useAddAccountModalView;