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
import { LoadingState } from "../../../../../../../Domain/Enums/LoadingState.ts";

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
  loadingState: LoadingState,
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
  const [formattedMonthlyStatistics, setFormattedMonthlyStatistics] =
    useState<monthlyStatistics>({});

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
  useEffect(() => {
    if (monthlyStatistics) {
      let incomesMonths = monthlyStatistics.incomes!.months;
      let sortedIncomesMonths = [...incomesMonths].sort((a, b) => a.month - b.month);

      let expensesMonths = monthlyStatistics.expenses!.months;
      let sortedExpensesMonths = [...expensesMonths].sort((a, b) => a.month - b.month);

      const formattedMonthlyStatistics: monthlyStatistics = {
        incomes: {
          difference: monthlyStatistics.incomes.difference,
          months: sortedIncomesMonths.map(item => {
            return formatMonthToMonthName(Number(item.month), currentLanguage);
          }),
          data: sortedIncomesMonths.map(item => {
              return item.totalIncome;
            }),
        },
        expenses: {
          difference: monthlyStatistics.expenses.difference,
          months: sortedExpensesMonths
            .map(item => {
              return formatMonthToMonthName(
                Number(item.month),
                currentLanguage,
              );
            }),
          data: sortedExpensesMonths.map(item => {
              return item.totalExpense;
            }),
        },
      };
      setFormattedMonthlyStatistics(formattedMonthlyStatistics);
    }
  }, [monthlyStatistics]);
  return {
    loadingState: loadingStatistics,
    monthlyStatistics: formattedMonthlyStatistics,
    month: formatMonthToMonthName(currentMonth, currentLanguage),
  };
};

export default monthlyStatistics;
