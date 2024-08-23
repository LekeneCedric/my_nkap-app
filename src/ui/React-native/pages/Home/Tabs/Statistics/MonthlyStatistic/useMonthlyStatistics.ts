import {useAppDispatch, useAppSelector} from "../../../../../../../app/hook.ts";
import {
    selectMonthlyStatistics,
    selectStatisticsCurrentMonth
} from "../../../../../../../Feature/Statistics/StatisticsSelectors.ts";
import {useEffect, useState} from "react";
import GetAllMonthlyStatisticAsync
    from "../../../../../../../Feature/Statistics/Thunks/GetAllMonthly/GetAllMonthlyStatisticAsync.ts";
import GetAllMonthlyStatisticsCommand
    from "../../../../../../../Feature/Statistics/Thunks/GetAllMonthly/GetAllMonthlyStatisticsCommand.ts";
import {selectUser} from "../../../../../../../Feature/Authentication/AuthenticationSelector.ts";
import useUtils from "../../../../../utils/useUtils.ts";
import useCustomTranslation from "../../../../../Shared/Hooks/useCustomTranslation.ts";
import useMoneyParser from "../../../../../Shared/useMoneyParser.ts";

type monthlyStatisticsItem = {
    difference: number,
    months: string[],
    data: number[],
}
type monthlyStatistics = {
    incomes?: monthlyStatisticsItem,
    expenses?: monthlyStatisticsItem
}

interface useMonthlyStatisticsBehaviour {
    monthlyStatistics: monthlyStatistics,
    month: string,
}

const monthlyStatistics = (currentLanguage: string): useMonthlyStatisticsBehaviour => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector(selectUser)!.userId;
    const currentYear = new Date().getFullYear();
    const currentMonth = useAppSelector(selectStatisticsCurrentMonth);
    const {formatMonthToMonthName} = useUtils();
    const monthlyStatistics = useAppSelector(selectMonthlyStatistics);
    const [formattedMonthlyStatistics, setFormattedMonthlyStatistics] = useState<monthlyStatistics>({});

    const getStatistics = async () => {
        const command: GetAllMonthlyStatisticsCommand = {
            userId: userId,
            year: currentYear,
            month: currentMonth,
        }
        const response = await dispatch(GetAllMonthlyStatisticAsync(command));
    }

    useEffect(() => {
            getStatistics();
        }, [currentMonth]);
    useEffect(() => {
        if (monthlyStatistics && currentLanguage) {
            const formattedMonthlyStatistics: monthlyStatistics = {
                incomes: {
                    difference: monthlyStatistics.incomes.difference,
                    months: monthlyStatistics
                        .incomes!
                        .months
                        .sort((a, b) => a.month - b.month)
                        .map((item) => {
                            return formatMonthToMonthName(Number(item.month), currentLanguage);
                        }),
                    data: monthlyStatistics
                        .incomes!
                        .months
                        .sort((a, b) => a.month - b.month)
                        .map((item) => {
                            return item.totalIncome;
                        })
                },
                expenses: {
                    difference: monthlyStatistics.expenses.difference,
                    months: monthlyStatistics
                        .expenses!
                        .months
                        .sort((a, b) => a.month - b.month)
                        .map((item) => {
                            return formatMonthToMonthName(Number(item.month), currentLanguage);
                        }),
                    data: monthlyStatistics
                        .expenses!
                        .months
                        .sort((a, b) => a.month - b.month)
                        .map((item) => {
                            return item.totalExpense;
                        }),
                }
            }
            setFormattedMonthlyStatistics(formattedMonthlyStatistics);
        }
    }, [monthlyStatistics]);
    return {
        monthlyStatistics: formattedMonthlyStatistics,
        month: formatMonthToMonthName(currentMonth, currentLanguage)
    };
}

export default monthlyStatistics;