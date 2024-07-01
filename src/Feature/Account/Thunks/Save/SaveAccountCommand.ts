export default interface ISaveAccountCommand {
    userId: string,
    name: string,
    type: string,
    icon: string,
    color: string,
    balance: number,
    isIncludeInTotalBalance: boolean,
    accountId?: string,
}