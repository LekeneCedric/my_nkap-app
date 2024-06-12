import {useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hook";
import { selectAccountLoadingState, selectAccounts } from "../../../../../Feature/Account/AccountSelector";
import { GetAllAccountAsync } from "../../../../../Feature/Account/Thunks/GetAll/GetAllAccountAsync";
import { selectUser } from "../../../../../Feature/Authentication/AuthenticationSelector";
import IAccount from "../../../../../Domain/Account/Account";
import { LoadingState } from "../../../../../Domain/Enums/LoadingState";
import { useToast } from "react-native-toast-notifications";
import {
    selectCurrentOperationsLimit,
    selectCurrentOperationsPage,
    selectOperationLoadingState,
    selectOperations
} from "../../../../../Feature/Operations/OperationsSelector.ts";
import IOperation from "../../../../../Domain/Operation/Operation.ts";
import FilterOperationsAsync from "../../../../../Feature/Operations/Thunks/Filter/FilterOperationsAsync.ts";
import IFilterOperationsCommand from "../../../../../Feature/Operations/Thunks/Filter/FilterOperationsCommand.ts";
import gatewayMessages from "../../../../../Infrastructure/Shared/Gateways/constants/gatewayMessages.ts";
import IOperationDto from "../../../../../Domain/Operation/IOperationDto.ts";

interface UseTransactionViewBehaviour {
    accounts: IAccount[],
    accountLoadingState: LoadingState,
    operations: IOperationDto[],
    operationsLoadingState: LoadingState,
    onRefresh: () => void,
    refreshing: boolean,
}
const useOperationsView = (): UseTransactionViewBehaviour => {
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const toast = useToast();
    const dispatch = useAppDispatch();
    const userId = useAppSelector(selectUser)?.userId;
    const accounts = useAppSelector(selectAccounts);
    const accountLoadingState = useAppSelector(selectAccountLoadingState)
    const operations = useAppSelector(selectOperations);
    const operationsLoadingState = useAppSelector(selectOperationLoadingState);
    const currentOperationsPage = useAppSelector(selectCurrentOperationsPage);
    const currentOperationsLimit = useAppSelector(selectCurrentOperationsLimit);

    const getAllAccounts = async () => {
            const response = await dispatch(GetAllAccountAsync({userId: userId!}));
            if (GetAllAccountAsync.rejected.match(response)) {
                //@ts-ignore
                toast.show(response.payload.message, {
                    type: "danger",
                    placement: "top",
                    duration: 3000,
                    animationType: "slide-in",
                });
            }
    }

    const getOperations = async (page?: number) => {
        const command: IFilterOperationsCommand = {
            userId: userId!,
            page: page ? page : currentOperationsPage!,
            limit: currentOperationsLimit!,
        }
        console.warn(currentOperationsPage, currentOperationsLimit, userId);

        const response = await dispatch(FilterOperationsAsync(command));
        if (FilterOperationsAsync.rejected.match(response)) {
            toast.show('Impossible de recuperer vos dernières opérations '+gatewayMessages.connexionError, {
                type: "danger",
                placement: "top",
                duration: 3000,
                animationType: "slide-in",
            });
        }
    }
    const onRefresh = async () => {
        setRefreshing(true);
        await getAllAccounts();
        await getOperations(1);
        setRefreshing(false);
    }
    useEffect(() => {
        const getData = async () => {
            await getAllAccounts();
            await getOperations(1);
        };
        getData();
    },[])

    return {
        accounts: accounts,
        accountLoadingState: accountLoadingState,
        operations: operations,
        operationsLoadingState: operationsLoadingState,
        refreshing: refreshing,
        onRefresh: onRefresh,
    };
};
export default useOperationsView;