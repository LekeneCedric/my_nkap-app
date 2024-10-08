import {useEffect, useState} from "react";
import GetAllMonthlyBycategoryStatisticAsync from "../../../../../../../Feature/Statistics/Thunks/GetAllMonthlyByCategory/GetAllMonthlyBycategoryStatisticAsync.ts";
import {useAppDispatch, useAppSelector} from "../../../../../../../app/hook.ts";
import GetAllMonthlyByCategoryStatisticsCommand from "../../../../../../../Feature/Statistics/Thunks/GetAllMonthlyByCategory/GetAllMonthlyByCategoryStatisticsCommand.ts";
import {selectUser} from "../../../../../../../Feature/Authentication/AuthenticationSelector.ts";
import {
  selectMonthlyCategoryByStatistics,
  selectStatisticsLoading,
  selectStatisticsCurrentMonth,
} from "../../../../../../../Feature/Statistics/StatisticsSelectors.ts";
import {FontSize} from "../../../../../Global/FontSize.ts";
import {LoadingState} from "../../../../../../../Domain/Enums/LoadingState.ts";

type ChartDataItem = {
  name: string;
  population: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
};

type StatsDataItem = {
  icon: string;
  color: string;
  label: string;
  amount: number;
  percentage: number;
};

interface IMonthlyByCategoryStatisticView {
  incomesChartData: ChartDataItem[];
  expensesChartData: ChartDataItem[];
  incomesStatsData: StatsDataItem[];
  expensesStatsData: StatsDataItem[];
  isShowIncomes: boolean;
  switchIsShowIncomes: (value: boolean) => void;
  loadingState: LoadingState;
}

const useMonthlyByCategoryStatisticView =
  (): IMonthlyByCategoryStatisticView => {
    const [isShowIncomes, setIsShowIncomes] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const userId = useAppSelector(selectUser)!.userId;
    const currentYear = new Date().getFullYear();
    const currentMonth = useAppSelector(selectStatisticsCurrentMonth);
    const monthlyByCategoryStatistics = useAppSelector(
      selectMonthlyCategoryByStatistics,
    );
    const loadingStatistics = useAppSelector(selectStatisticsLoading);
    const [incomesChartData, setIncomesChartData] = useState<ChartDataItem[]>([]);
    const [incomesStatsData, setIncomesStatsData] = useState<StatsDataItem[]>([]);
    const [expensesChartData, setExpensesChartData] = useState<ChartDataItem[]>([]);
    const [expensesStatsData, setExpensesStatsData] = useState<StatsDataItem[]>([]);

    const proceeedData = () => {
      setIncomesChartData(monthlyByCategoryStatistics.incomes
          .filter(item => item.percentage > 0)
          .map(item => {
            return {
              name: "",
              population: item.totalIncome,
              color: item.categoryColor,
              legendFontColor: item.categoryColor,
              legendFontSize: FontSize.normal,
            };
          })
          .sort((a, b) => b.population - a.population));
      setIncomesStatsData(monthlyByCategoryStatistics.incomes
        .filter(item => item.percentage > 0)
        .map(item => {
          return {
            icon: item.categoryIcon,
            color: item.categoryColor,
            label: item.categoryLabel,
            amount: item.totalIncome,
            percentage: item.percentage,
          };
        })
        .sort((a, b) => b.percentage - a.percentage));
      setExpensesChartData(monthlyByCategoryStatistics.expenses
        .filter(item => item.percentage > 0)
        .map(item => {
          return {
            name: "",
            population: item.totalExpense,
            color: item.categoryColor,
            legendFontColor: item.categoryColor,
            legendFontSize: FontSize.normal,
          };
        })
        .sort((a, b) => b.population - a.population));
      setExpensesStatsData(monthlyByCategoryStatistics.expenses
          .filter(item => item.percentage > 0)
          .map(item => {
            return {
              icon: item.categoryIcon,
              color: item.categoryColor,
              label: item.categoryLabel,
              amount: item.totalExpense,
              percentage: item.percentage,
            };
          })
          .sort((a, b) => b.percentage - a.percentage));
    };

    const switchIsShowIncomes = (value: boolean) => {
      setIsShowIncomes(value);
    };
    const getAllMonthlyByCategoryStatistics = async () => {
      const command: GetAllMonthlyByCategoryStatisticsCommand = {
        userId: userId,
        year: currentYear,
        month: currentMonth,
      };
      console.warn('s-month', currentMonth);
      await dispatch(GetAllMonthlyBycategoryStatisticAsync(command));
    };
    useEffect(() => {
      proceeedData();
    }, [monthlyByCategoryStatistics])
    useEffect(() => {
      getAllMonthlyByCategoryStatistics();
    }, [currentMonth]);
    return {
      incomesChartData: incomesChartData,
      expensesChartData: expensesChartData,
      incomesStatsData: incomesStatsData,
      expensesStatsData: expensesStatsData,
      isShowIncomes: isShowIncomes,
      switchIsShowIncomes: switchIsShowIncomes,
      loadingState: loadingStatistics,
    };
  };

export default useMonthlyByCategoryStatisticView;
