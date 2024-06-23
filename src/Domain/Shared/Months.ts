import {MonthsEnum} from "../Enums/Months.ts";

export type MonthItem = {
    label: string,
    value: number
}
type MonthItemCollection = {
    [key in MonthsEnum]: MonthItem
}
const Months: MonthItemCollection = {
    [MonthsEnum.JANUARY]: {label: 'January', value: 1},
    [MonthsEnum.FEBRUARY]: {label: 'February', value: 2},
    [MonthsEnum.MARCH]: {label: 'March', value: 3},
    [MonthsEnum.APRIL]: {label: 'April', value: 4},
    [MonthsEnum.MAY]: {label: 'May', value: 5},
    [MonthsEnum.JUNE]: {label: 'June', value: 6},
    [MonthsEnum.JULY]: {label: 'July', value: 7},
    [MonthsEnum.AUGUST]: {label: 'August', value: 8},
    [MonthsEnum.SEPTEMBER]: {label: 'September', value: 9},
    [MonthsEnum.OCTOBER]: {label: 'October', value: 10},
    [MonthsEnum.NOVEMBER]: {label: 'November', value: 11},
    [MonthsEnum.DECEMBER]: {label: 'December', value: 12},
};
export default Months;