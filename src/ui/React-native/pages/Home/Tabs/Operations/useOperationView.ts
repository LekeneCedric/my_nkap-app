import {useEffect, useRef, useState} from "react";
import {Animated, Easing} from "react-native";
import {useAppDispatch, useAppSelector} from "../../../../../../app/hook";
import {
  selectAccountLoadingState,
  selectAccounts,
} from "../../../../../../Feature/Account/AccountSelector";
import {GetAllAccountAsync} from "../../../../../../Feature/Account/Thunks/GetAll/GetAllAccountAsync";
import {selectUser} from "../../../../../../Feature/Authentication/AuthenticationSelector";
import IAccount, {IAccountItem} from "../../../../../../Domain/Account/Account";
import {LoadingState} from "../../../../../../Domain/Enums/LoadingState";
import {useToast} from "react-native-toast-notifications";
import {
  selectCurrentOperationsLimit,
  selectCurrentOperationsPage,
  selectOperationLoadingState,
  selectOperations,
  selectOperationsByDate,
  selectOperationsFilterParams,
} from "../../../../../../Feature/Operations/OperationsSelector.ts";
import {
  IOperationFilterParam,
  IOperationTypeEnum,
  OperationDateItem,
} from "../../../../../../Domain/Operation/Operation.ts";
import FilterOperationsAsync from "../../../../../../Feature/Operations/Thunks/Filter/FilterOperationsAsync.ts";
import IFilterOperationsCommand from "../../../../../../Feature/Operations/Thunks/Filter/FilterOperationsCommand.ts";
import gatewayMessages from "../../../../../../Infrastructure/Shared/Gateways/constants/gatewayMessages.ts";
import IOperationDto from "../../../../../../Domain/Operation/IOperationDto.ts";
import useNavigation from "../../../../utils/useNavigation.ts";
import {routes} from "../../../routes";
import {
  ChangeOperationFilterParam,
  ResetFilter,
} from "../../../../../../Feature/Operations/OperationSlice.ts";
import {
  formatDateToReadable,
  formatDateToYYYYMMDD,
} from "../../../../../../Infrastructure/Shared/Utils/DateOperations.ts";
import {selectCategories} from "../../../../../../Feature/Category/CategorySelector.ts";
import ICategory from "../../../../../../Domain/Category/Category.ts";
import ISelectCategoryItem from "../../../../Components/Forms/SelectCategory/SelectCategoryItem.ts";
import IGetAllCategoryCommand from "../../../../../../Feature/Category/Thunks/GetAll/GetAllCategoryCommand.ts";
import GetAllCategoryAsync from "../../../../../../Feature/Category/Thunks/GetAll/GetAllCategoryAsync.ts";
import {MonthItem} from "../../../../../../Domain/Shared/Months.ts";
import ISelectItem from "../../../../Components/Forms/Select/SelectItem.ts";
import useCustomTranslation from "../../../../Shared/Hooks/useCustomTranslation.ts";

interface UseTransactionViewBehaviour {
  accounts: IAccount[];
  accountLoadingState: LoadingState;
  operations: IOperationDto[];
  operationsLoadingState: LoadingState;
  onRefresh: () => void;
  refreshing: boolean;
  bounceValue: Animated.Value;
  navigateToAddOperation: () => void;
  operationFilterParams: IOperationFilterParam;
  handlePreviousDay: (pageNumber: number) => void;
  handleNextDay: (pageNumber: number) => void;
  categories: ICategory[];
  selectCategory: (category: ICategory) => void;
  resetFilter: () => void;
  selectOperationType: (operationType: IOperationTypeEnum) => void;
  selectMonth: (month: MonthItem) => void;
  operationsByDate: OperationDateItem[];
  selectAccount: (account: IAccountItem) => void;
  accountsList: ISelectItem[];
  shouldNotGoForwardNextDay: boolean;
  shouldNoyGoForwardFourthNexDays: boolean;
}
const useOperationsView = (): UseTransactionViewBehaviour => {
  const today = new Date();
  const {translate, currentLanguage} = useCustomTranslation();
  const todayFormatted = translate("today");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const operationFilterParams = useAppSelector(selectOperationsFilterParams);
  const bounceValue = useRef(new Animated.Value(0)).current;
  const {navigateByPath} = useNavigation();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUser)?.userId;
  const accounts = useAppSelector(selectAccounts);
  const accountLoadingState = useAppSelector(selectAccountLoadingState);
  const operations = useAppSelector(selectOperations);
  const categories = useAppSelector(selectCategories);
  const operationsLoadingState = useAppSelector(selectOperationLoadingState);
  const currentOperationsPage = useAppSelector(selectCurrentOperationsPage);
  const currentOperationsLimit = useAppSelector(selectCurrentOperationsLimit);
  const operationsByDate = useAppSelector(selectOperationsByDate);
  const navigateToAddOperation = () => {
    navigateByPath(routes.home.addOperationByAI);
  };
  const [shouldNotGoForwardNextDay, setShouldNotGoForwardNextDay] =
    useState<boolean>(true);
  const [shouldNoyGoForwardFourthNexDays, setShouldNotGoForwardFourthNexDays] =
    useState<boolean>(true);

  useEffect(() => {
    if (operationFilterParams.selectedDate && (typeof(operationFilterParams.selectedDate) === typeof(new Date()))) {
      const shouldNotGoForwardNextDay =
        operationFilterParams.selectedDate.getFullYear() >= today.getFullYear() &&
        operationFilterParams.selectedDate.getMonth() >= today.getMonth() &&
        operationFilterParams.selectedDate.getDate() >= today.getDate();
      const shouldNotGoForwardFourthNexDays =
        operationFilterParams.selectedDate.getFullYear() >= today.getFullYear() &&
        operationFilterParams.selectedDate.getMonth() >= today.getMonth() &&
        operationFilterParams.selectedDate.getDate() + 3 >= today.getDate();
      setShouldNotGoForwardNextDay(shouldNotGoForwardNextDay);
      setShouldNotGoForwardFourthNexDays(shouldNotGoForwardFourthNexDays);
    }
  }, [operationFilterParams.selectedDate]);

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
  };

  type getOperations = {
    month?: number;
    year?: number;
    page?: number;
    date?: string;
    categoryId?: string;
    type?: IOperationTypeEnum;
    accountId?: string;
  };
  const getOperations = async (params: getOperations) => {
    const page = params.page;
    const date = params.date;
    const categoryId = params.categoryId;
    const type = params.type;
    const month = params.month;
    const year = params.year;
    const accountId = params.accountId;
    const command: IFilterOperationsCommand = {
      userId: userId!,
      page: page ?? currentOperationsPage!,
      limit: currentOperationsLimit!,
      filterParams: {
        ...operationFilterParams,
        date: date ?? operationFilterParams.date,
        categoryId: categoryId ?? operationFilterParams.categoryId,
        operationType: type ?? operationFilterParams.operationType,
        year: year ?? operationFilterParams.year,
        month: month ?? operationFilterParams.month,
        accountId: accountId ?? operationFilterParams.accountId,
      },
    };

    const response = await dispatch(FilterOperationsAsync(command));
    if (FilterOperationsAsync.rejected.match(response)) {
      toast.show(
        "Impossible de recuperer vos dernières opérations " +
          gatewayMessages.connexionError,
        {
          type: "danger",
          placement: "top",
          duration: 3000,
          animationType: "slide-in",
        },
      );
    }
  };
  const selectCategory = async (category: ICategory) => {
    dispatch(
      ChangeOperationFilterParam({
        ...operationFilterParams,
        categoryId: category.id,
        categoryIcon: category.icon,
        categoryLabel: category.name,
      }),
    );
    await getOperations({categoryId: category.id});
  };
  const selectOperationType = async (operationType: IOperationTypeEnum) => {
    dispatch(
      ChangeOperationFilterParam({
        ...operationFilterParams,
        operationType: operationType,
        typeLabel:
          operationType == IOperationTypeEnum.EXPENSE ? "Dépenses" : "Revenus",
      }),
    );
    await getOperations({type: operationType});
  };
  const selectMonth = async (month: MonthItem) => {
    const today = new Date();
    const year = today.getFullYear();
    dispatch(
      ChangeOperationFilterParam({
        ...operationFilterParams,
        monthLabel: month.label,
        month: month.value,
        year: year,
      }),
    );
    await getOperations({month: month.value, year: year});
  };
  const selectAccount = async (account: IAccountItem) => {
    dispatch(
      ChangeOperationFilterParam({
        ...operationFilterParams,
        accountId: account.id,
        accountIcon: account.icon,
        accountLabel: account.label,
      }),
    );
    await getOperations({accountId: account.id});
  };
  const accountsSelectItems = accounts.map((ac: IAccount): ISelectItem => {
    return {
      id: ac.id,
      icon: ac.icon,
      name: ac.name,
      color: ac.color,
    };
  });
  const onRefresh = async () => {
    setRefreshing(true);
    await getAllAccounts();
    await getOperations({page: 1});
    setRefreshing(false);
  };

  const resetFilter = () => {
    dispatch(ResetFilter());
  };

  const handlePreviousDay = async (numberOfDay: number) => {
    const previousDay = operationFilterParams.selectedDate
      ? new Date(operationFilterParams.selectedDate)
      : new Date();
    previousDay.setDate(previousDay.getDate() - numberOfDay);
    const formattedDateToYYYMMDD = formatDateToYYYYMMDD(previousDay);
    const formattedDate = formatDateToReadable(
      previousDay,
      todayFormatted,
      currentLanguage,
    );
    dispatch(
      ChangeOperationFilterParam({
        ...operationFilterParams,
        selectedDate: previousDay,
        formattedDate: formattedDate,
        date: formattedDateToYYYMMDD,
      }),
    );
    await getOperations({date: formattedDateToYYYMMDD});
  };
  const handleNextDay = async (numberOfDay: number) => {
    const today = new Date();
    const nextDayBeforeComparison = operationFilterParams.selectedDate
      ? new Date(operationFilterParams.selectedDate)
      : new Date();
    const nextDay = operationFilterParams.selectedDate
      ? new Date(operationFilterParams.selectedDate)
      : new Date();
    nextDay.setDate(nextDay.getDate() + numberOfDay);
    const formattedDateToYYYMMDD = formatDateToYYYYMMDD(nextDay);
    const formattedDate = formatDateToReadable(
      nextDay,
      todayFormatted,
      currentLanguage,
    );
    if (today.getTime() >= nextDayBeforeComparison.getTime()) {
      dispatch(
        ChangeOperationFilterParam({
          ...operationFilterParams,
          selectedDate: nextDay,
          formattedDate: formattedDate,
          date: formattedDateToYYYMMDD,
        }),
      );
      await getOperations({date: formattedDateToYYYMMDD});
    }
  };

  const categoriesSelectItems = categories.map(
    (ca: ICategory): ISelectCategoryItem => {
      return {
        id: ca.id,
        icon: ca.icon,
        name: ca.name,
        color: ca.color,
        description: ca.description,
      };
    },
  );

  useEffect(() => {
    // dispatch(ResetFilter());
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
      ]),
    ).start();
    const getAccounts = async () => {
      await getAllAccounts();
    };

    const getAllCategories = async () => {
      const command = {
        userId: userId ? userId : "",
      } as IGetAllCategoryCommand;
      await dispatch(GetAllCategoryAsync(command));
    };
    if (categories.length == 0) {
      getAllCategories();
    }
    getAccounts();
  }, []);
  useEffect(() => {
    const today = new Date();
    const formattedDate = formatDateToReadable(
      today,
      todayFormatted,
      currentLanguage,
    );
    const formattedDateToYYYMMDD = formatDateToYYYYMMDD(today);
    dispatch(
      ChangeOperationFilterParam({
        ...operationFilterParams,
        selectedDate: today,
        formattedDate: formattedDate,
        date: formattedDateToYYYMMDD,
      }),
    );
  }, []);
  useEffect(() => {
    const getOperationsData = async () => {
      await getOperations({page: 1});
    };
    getOperationsData();
  }, [operationFilterParams, currentLanguage]);

  return {
    accounts: accounts,
    accountLoadingState: accountLoadingState,
    operations: operations,
    operationsLoadingState: operationsLoadingState,
    refreshing: refreshing,
    onRefresh: onRefresh,
    bounceValue: bounceValue,
    navigateToAddOperation: navigateToAddOperation,
    operationFilterParams: operationFilterParams,
    handlePreviousDay: handlePreviousDay,
    handleNextDay: handleNextDay,
    categories: categoriesSelectItems,
    selectCategory: selectCategory,
    resetFilter: resetFilter,
    selectOperationType: selectOperationType,
    selectMonth: selectMonth,
    operationsByDate: operationsByDate,
    selectAccount: selectAccount,
    accountsList: accountsSelectItems,
    shouldNotGoForwardNextDay: shouldNotGoForwardNextDay,
    shouldNoyGoForwardFourthNexDays: shouldNoyGoForwardFourthNexDays,
  };
};
export default useOperationsView;
