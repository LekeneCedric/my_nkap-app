import ISelectItem from "../../../../../../Components/Forms/Select/SelectItem.ts";
import {useForm, UseFormReturn} from "react-hook-form";
import FinancialGoalForm
    from "../../../../../../../../Infrastructure/Validators/Forms/FinancialGoal/FinancialGoalForm.ts";
import {LoadingState} from "../../../../../../../../Domain/Enums/LoadingState.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import FinancialGoalFormSchemaValidate
    from "../../../../../../../../Infrastructure/Validators/Forms/FinancialGoal/FinancialGoalFormSchemaValidate.ts";
import {useAppDispatch, useAppSelector} from "../../../../../../../../app/hook.ts";
import {selectAccounts} from "../../../../../../../../Feature/Account/AccountSelector.ts";
import IAccount from "../../../../../../../../Domain/Account/Account.ts";
import {selectFinancialGoalsLoadingState} from "../../../../../../../../Feature/FinancialGoal/FinancialGoalSelector.ts";
import {IFinancialGoal} from "../../../../../../../../Domain/FinancialGoal/FinancialGoal.ts";
import {selectUser} from "../../../../../../../../Feature/Authentication/AuthenticationSelector.ts";
import DeleteFinancialGoalAsync
    from "../../../../../../../../Feature/FinancialGoal/Thunks/Delete/DeleteFinancialGoalAsync.ts";
import {
    DeleteFinancialGoal,
    UpdateFinancialGoal
} from "../../../../../../../../Feature/FinancialGoal/FinancialGoalSlice.ts";
import ISaveFinancialGoalCommand
    from "../../../../../../../../Feature/FinancialGoal/Thunks/Save/SaveFinancialGoalCommand.ts";
import SaveFinancialGoalAsync
    from "../../../../../../../../Feature/FinancialGoal/Thunks/Save/SaveFinancialGoalAsync.ts";
import {useToast} from "react-native-toast-notifications";


export type AddFinancialGoalsFormBehaviour = {
    form: UseFormReturn<FinancialGoalForm>,
    onSubmit: (financialGoal: FinancialGoalForm) => void,
    loadingState: LoadingState,
}

interface behaviour {
    addFinancialGoalFormBehaviour: AddFinancialGoalsFormBehaviour
    accounts: ISelectItem[],
    deleteFinancialGoal: () => void,
}

const useFinancialGoalDetailsModalView = (data: IFinancialGoal): behaviour => {
    const dispatch = useAppDispatch();
    const toast = useToast();
    const userId = useAppSelector(selectUser)!.userId;
    const loadingState = useAppSelector(selectFinancialGoalsLoadingState);
    const form = useForm<FinancialGoalForm>({
        resolver: yupResolver(FinancialGoalFormSchemaValidate),
        defaultValues: {
            financialGoalId: data.id,
            userId: userId,
            accountId: data.accountId,
            startDate: data.startDate,
            endDate: data.endDate,
            desiredAmount: data.desiredAmount,
            details: data.title,
        }
    });
    const onSubmit = async (dataForm: FinancialGoalForm) => {
        const command = {
            financialGoalId: dataForm.financialGoalId,
            userId: dataForm.userId,
            accountId: dataForm.accountId,
            startDate: dataForm.startDate,
            endDate: dataForm.endDate,
            desiredAmount: dataForm.desiredAmount,
            details: dataForm.details,
        } as ISaveFinancialGoalCommand;
        const response = await dispatch(SaveFinancialGoalAsync(command));
        if (SaveFinancialGoalAsync.rejected.match(response)) {
            // @ts-ignore
            toast.show(response.payload.message, {
                type: "danger",
                placement: "top",
                duration: 3000,
                animationType: "slide-in",
            });
        }
        if (SaveFinancialGoalAsync.fulfilled.match(response)) {
            dispatch(UpdateFinancialGoal({
                id: dataForm.financialGoalId,
                accountId: dataForm.accountId,
                startDate: dataForm.startDate,
                endDate: dataForm.endDate,
                currentAmount: data.currentAmount,
                desiredAmount: dataForm.desiredAmount,
                title: dataForm.details
            } as IFinancialGoal));
            toast.show('objectif financier modifié avec succès !', {
                type: "success",
                placement: "top",
                duration: 3000,
                animationType: "slide-in",
            });
        }
    }
    const accounts = useAppSelector(selectAccounts);
    const accountsSelectItems = accounts.map((ac: IAccount): ISelectItem => {
        return {
            id: ac.id,
            icon: ac.icon,
            name: ac.name,
            color: ac.color,
        }
    });
    const deleteFinancialGoal = async () => {
        const response = await dispatch(DeleteFinancialGoalAsync({financialGoalId: data.id}));
        if (DeleteFinancialGoalAsync.rejected.match(response)) {
            // @ts-ignore
            toast.show(response.payload.message, {
                type: "danger",
                placement: "top",
                duration: 3000,
                animationType: "slide-in",
            });
        }
        if (DeleteFinancialGoalAsync.fulfilled.match(response)) {
            dispatch(DeleteFinancialGoal({
                financialGoalId: data.id,
            }))
        }
    }
    return {
        addFinancialGoalFormBehaviour: {
            form: form,
            loadingState: loadingState,
            onSubmit: onSubmit,
        },
        accounts: accountsSelectItems,
        deleteFinancialGoal: deleteFinancialGoal,
    };
};
export default useFinancialGoalDetailsModalView;