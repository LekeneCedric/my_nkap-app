import {useEffect, useRef, useState} from "react";
import {Animated, Easing} from "react-native";
import useNavigation from "../../../../utils/useNavigation.ts";
import {routes} from "../../../routes";
import {FinancialGoalStatus, IFinancialGoal} from "../../../../../../Domain/FinancialGoal/FinancialGoal.ts";
import {useAppDispatch, useAppSelector} from "../../../../../../app/hook.ts";
import {
    selectFinancialGoals,
    selectFinancialGoalsLoadingState
} from "../../../../../../Feature/FinancialGoal/FinancialGoalSelector.ts";
import GetAllFinancialGoalAsync
    from "../../../../../../Feature/FinancialGoal/Thunks/GetAll/GetAllFinancialGoalAsync.ts";
import {selectUser} from "../../../../../../Feature/Authentication/AuthenticationSelector.ts";
import {LoadingState} from "../../../../../../Domain/Enums/LoadingState.ts";
import {useToast} from "react-native-toast-notifications";
import useTheme from "../../../../Shared/Hooks/useTheme.ts";

interface IUseFinancialGoalViewBehaviour {
    bounceValue: Animated.Value,
    navigateToAddFinancialGoals: () => void,
    financialGoals: IFinancialGoal[],
    filteredFinancialGoals: IFinancialGoal[],
    loadingState: LoadingState,
    financialGoalsIsPendingRefreshing: boolean,
    onRefresh: () => void,
    financialGoalsFilterProps: FinancialGoalFilterParam[],
    currentSelectedStatus: FinancialGoalStatus|null,
    updateSelectedStatus: (status: FinancialGoalStatus) => void
}

type FinancialGoalFilterParam = {
    backgroundColor: string,
    value: FinancialGoalStatus,
};
const useFinancialGoalsView = (): IUseFinancialGoalViewBehaviour => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector(selectUser)!.userId;
    const loadingState = useAppSelector(selectFinancialGoalsLoadingState);
    const toast = useToast();
    const {navigateByPath} = useNavigation();
    const [financialGoalsIsPendingRefreshing, setFinancialGoalsIsPendingRefreshing] = useState<boolean>(false);
    const bounceValue = useRef(new Animated.Value(0)).current;
    const financialGoals = useAppSelector(selectFinancialGoals);
    const {colorPalette: {red, action1, green}} = useTheme();
    const [selectedStatus, setSelectedStatus] = useState<FinancialGoalStatus|null>(null)

    const financialGoalsFilterProps: FinancialGoalFilterParam[] = [
        {
            backgroundColor: red,
            value: FinancialGoalStatus.FAILED,
        },
        {
            backgroundColor: green,
            value: FinancialGoalStatus.COMPLETE,
        },
        {
            backgroundColor: action1,
            value: FinancialGoalStatus.PENDING,
        }
    ];

    const navigateToAddFinancialGoals = () => {
        navigateByPath(routes.home.addFinancialGoals);
    }

    const onRefresh = async () => {
        setFinancialGoalsIsPendingRefreshing(true);
    }
    const loadFinancialGoals = async () => {
        const response = await dispatch(GetAllFinancialGoalAsync({userId: userId}));
        if (GetAllFinancialGoalAsync.rejected.match(response)) {
            // @ts-ignore
            toast.show(response.payload.message, {
                type: "danger",
                placement: "top",
                duration: 3000,
                animationType: "slide-in",
            });
        }
    }
    const financialGoalStatus = (f: IFinancialGoal) => {
        const today = new Date();
        const endDate = new Date(f.endDate);
        let financialGoalDateHasPassed = today.getTime() > endDate.getTime();
        let financialGoalHasNotBeenReached = f.currentAmount < f.desiredAmount;
        if (financialGoalDateHasPassed && financialGoalHasNotBeenReached) {
            return FinancialGoalStatus.FAILED;
        }
        if (f.isComplete) {
            return FinancialGoalStatus.COMPLETE;
        }
        return FinancialGoalStatus.PENDING;
    }

    const filteredFinancialGoalByStatus = financialGoals.filter(f => {
        if (!selectedStatus) return true;
        return financialGoalStatus(f) === selectedStatus;
    })
    const updateSelectedStatus = (status: FinancialGoalStatus) => {
        setSelectedStatus(status);
    }


    useEffect(() => {
        // setFilteredFinancialGoal(financialGoals);
        const startBouncing = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(bounceValue, {
                        toValue: 4,
                        duration: 500,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                    Animated.timing(bounceValue, {
                        toValue: 0,
                        duration: 500,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        };
        startBouncing();
        loadFinancialGoals().then(() => {
            setFinancialGoalsIsPendingRefreshing(false);
        });
    }, [financialGoalsIsPendingRefreshing]);
    return {
        loadingState: loadingState,
        financialGoals: financialGoals,
        bounceValue: bounceValue,
        navigateToAddFinancialGoals: navigateToAddFinancialGoals,
        financialGoalsIsPendingRefreshing: financialGoalsIsPendingRefreshing,
        onRefresh: onRefresh,
        financialGoalsFilterProps: financialGoalsFilterProps,
        updateSelectedStatus: updateSelectedStatus,
        currentSelectedStatus: selectedStatus,
        filteredFinancialGoals: filteredFinancialGoalByStatus,
    }
};
export default useFinancialGoalsView;