import {useAppDispatch, useAppSelector} from "../../../../../../../app/hook.ts";
import {
  selectMonthlyStatistics,
  selectStatisticsCurrentMonth,
  selectStatisticsLoading,
} from "../../../../../../../Feature/Statistics/StatisticsSelectors.ts";
import {useEffect, useState} from "react";
import GetAllMonthlyStatisticAsync from "../../../../../../../Feature/Statistics/Thunks/GetAllMonthly/GetAllMonthlyStatisticAsync.ts";
import GetAllMonthlyStatisticsCommand from "../../../../../../../Feature/Statistics/Thunks/GetAllMonthly/GetAllMonthlyStatisticsCommand.ts";
import {selectUser} from "../../../../../../../Feature/Authentication/AuthenticationSelector.ts";
import useUtils from "../../../../../utils/useUtils.ts";
import {LoadingState} from "../../../../../../../Domain/Enums/LoadingState.ts";

type monthlyStatisticsItem = {
  difference: number;
  months: string[];
  data: number[];
};
type monthlyStatistics = {
  incomes?: monthlyStatisticsItem;
  expenses?: monthlyStatisticsItem;
};

interface useMonthlyStatisticsBehaviour {
  monthlyStatistics: monthlyStatistics;
  month: string;
  loadingState: LoadingState;
}

const monthlyStatistics = (
  currentLanguage: string,
): useMonthlyStatisticsBehaviour => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUser)!.userId;
  const currentYear = new Date().getFullYear();
  const currentMonth = useAppSelector(selectStatisticsCurrentMonth);
  const loadingStatistics = useAppSelector(selectStatisticsLoading);
  const {formatMonthToMonthName} = useUtils();
  const monthlyStatistics = useAppSelector(selectMonthlyStatistics);
  const formattedMonthlyStatistics: monthlyStatistics = {
    incomes: monthlyStatistics
      ? {
          difference: monthlyStatistics.incomes.difference,
          months: [...monthlyStatistics.incomes!.months]
            .sort((a, b) => a.month - b.month)
            .map(item => {
              return formatMonthToMonthName(
                Number(item.month),
                currentLanguage,
              );
            }),
          data: [...monthlyStatistics.incomes!.months]
            .sort((a, b) => a.month - b.month)
            .map(item => {
              return item.totalIncome;
            }),
        }
      : {
          difference: 0,
          months: [],
          data: [],
        },
    expenses: monthlyStatistics
      ? {
          difference: monthlyStatistics.expenses.difference,
          months: [...monthlyStatistics.expenses!.months]
            .sort((a, b) => a.month - b.month)
            .map(item => {
              return formatMonthToMonthName(
                Number(item.month),
                currentLanguage,
              );
            }),
          data: [...monthlyStatistics.expenses!.months]
            .sort((a, b) => a.month - b.month)
            .map(item => {
              return item.totalExpense;
            }),
        }
      : {
          difference: 0,
          months: [],
          data: [],
        },
  };
  const getStatistics = async () => {
    const command: GetAllMonthlyStatisticsCommand = {
      userId: userId,
      year: currentYear,
      month: currentMonth,
    };
    await dispatch(GetAllMonthlyStatisticAsync(command));
  };

  useEffect(() => {
    getStatistics();
  }, [currentMonth]);
  return {
    loadingState: loadingStatistics,
    monthlyStatistics: formattedMonthlyStatistics,
    month: formatMonthToMonthName(currentMonth, currentLanguage),
  };
};

export default monthlyStatistics;
