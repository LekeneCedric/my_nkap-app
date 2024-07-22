import {useForm, UseFormReturn} from "react-hook-form";
import FinancialGoalForm from "../../../../../Infrastructure/Validators/Forms/FinancialGoal/FinancialGoalForm.ts";
import {LoadingState} from "../../../../../Domain/Enums/LoadingState.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import FinancialGoalFormSchemaValidate
    from "../../../../../Infrastructure/Validators/Forms/FinancialGoal/FinancialGoalFormSchemaValidate.ts";
import {useAppDispatch, useAppSelector} from "../../../../../app/hook.ts";
import {selectFinancialGoalsLoadingState} from "../../../../../Feature/FinancialGoal/FinancialGoalSelector.ts";
import ISelectItem from "../../../Components/Forms/Select/SelectItem.ts";
import {selectAccounts} from "../../../../../Feature/Account/AccountSelector.ts";
import IAccount from "../../../../../Domain/Account/Account.ts";
import {selectUser} from "../../../../../Feature/Authentication/AuthenticationSelector.ts";
import {IFinancialGoal} from "../../../../../Domain/FinancialGoal/FinancialGoal.ts";
import ISaveFinancialGoalCommand from "../../../../../Feature/FinancialGoal/Thunks/Save/SaveFinancialGoalCommand.ts";
import SaveFinancialGoalAsync from "../../../../../Feature/FinancialGoal/Thunks/Save/SaveFinancialGoalAsync.ts";
import {useToast} from "react-native-toast-notifications";
import useNavigation from "../../../utils/useNavigation.ts";
import {AddFinancialGoal} from "../../../../../Feature/FinancialGoal/FinancialGoalSlice.ts";

export type AddFinancialGoalsFormBehaviour = {
    form: UseFormReturn<FinancialGoalForm>,
    onSubmit: (financialGoal: FinancialGoalForm) => void,
    loadingState: LoadingState,
}
interface UseAddFinancialGoalsView {
    addFinancialGoalFormBehaviour: AddFinancialGoalsFormBehaviour,
    accounts: ISelectItem[],
}

const useAddFinancialGoalsView = (): UseAddFinancialGoalsView => {
    const dispatch = useAppDispatch();
    const toast = useToast();
    const userId = useAppSelector(selectUser)!.userId
    const loadingState: LoadingState=  useAppSelector(selectFinancialGoalsLoadingState);
    const form = useForm<FinancialGoalForm>({
        resolver: yupResolver(FinancialGoalFormSchemaValidate),
        defaultValues: {userId: userId}
    });
    const accounts = useAppSelector(selectAccounts);
    const {goBack} = useNavigation();

    const onSubmit = async (data: FinancialGoalForm) => {
        const command = {
            userId: data.userId,
            accountId: data.accountId,
            startDate: data.startDate,
            endDate: data.endDate,
            desiredAmount: data.desiredAmount,
            details: data.details,
        } as ISaveFinancialGoalCommand
        const response = await dispatch(SaveFinancialGoalAsync(command));
        if (SaveFinancialGoalAsync.rejected.match(response)) {
            // @ts-ignore
            toast.show(response.payload.message, {
                type: "danger",
                placement: "top",
                duration: 3000,
                animationType: "slide-in",
            });
            return;
        }
        const newFinancialGoal = {
            id: response.payload.financialGoalId,
            title: data.details,
            accountId: data.accountId,
            startDate: data.startDate,
            endDate: data.endDate,
            currentAmount: 0,
            desiredAmount: data.desiredAmount,
            createdAt: new Date(),
        } as IFinancialGoal;
        dispatch(AddFinancialGoal(newFinancialGoal));
        goBack();
    }
    const accountsSelectItems = accounts.map((ac: IAccount): ISelectItem => {
        return {
            id: ac.id,
            icon: ac.icon,
            name: ac.name,
            color: ac.color,
        }
    });
    return {
        addFinancialGoalFormBehaviour: {
            form: form,
            loadingState: loadingState,
            onSubmit: onSubmit,
        },
        accounts: accountsSelectItems,
    }
};
export default useAddFinancialGoalsView;