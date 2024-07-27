type MonthlyStatisticIncomeMonthItem = {
    month: number,
    totalIncome: number
}
type MonthlyStatisticExpenseMonthItem = {
    month: number,
    totalExpense: number
}
type MonthlyStatisticIncomeItem = {
    months: MonthlyStatisticIncomeMonthItem[],
    difference: number
}
type MonthlyStatisticExpenseItem = {
    months: MonthlyStatisticExpenseMonthItem[],
    difference: number
}
export interface IMonthlyStatistic {
    incomes: MonthlyStatisticIncomeItem,
    expenses: MonthlyStatisticExpenseItem
}

type MonthlyCategoryStatisticIncomeItem = {
    id: string,
    composedId: string,
    userId : string,
    year : number,
    month : number,
    categoryId : string,
    categoryIcon : string,
    categoryLabel : string,
    categoryColor : string,
    totalIncome : number,
    percentage : number
}
type MonthlyCategoryStatisticExpenseItem = {
    id: string,
    composedId: string,
    userId : string,
    year : number,
    month : number,
    categoryId : string,
    categoryIcon : string,
    categoryLabel : string,
    categoryColor : string,
    totalExpense : number,
    percentage : number
}
export interface IMonthlyCategoryStatistic {
    incomes: MonthlyCategoryStatisticIncomeItem[],
    expenses: MonthlyCategoryStatisticExpenseItem[],
}