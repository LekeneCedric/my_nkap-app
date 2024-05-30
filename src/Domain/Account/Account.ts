export default interface IAccount {
    id: string,
    name: string,
    type: string,
    totalIncomes: number,
    totalExpenses: number,
    balance: number,
    isIncludeInTotalBalance: number,
    color: string,
    icon: string,
}