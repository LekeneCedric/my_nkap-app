import IOperation from "../../../../Domain/Operation/Operation.ts";

export default interface IFilterOperationsResponse {
    status: boolean,
    operations: IOperation[],
    total: number,
    numberOfPages: number,
}
