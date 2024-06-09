import IOperation from "../../../../Domain/Operation/Operation.ts";
import IOperationDto from "../../../../Domain/Operation/IOperationDto.ts";

export default interface IFilterOperationsResponse {
    status: boolean,
    operations: IOperationDto[],
    total: number,
    numberOfPages: number,
}
