import IOperation, {OperationDateItem} from "../../../../Domain/Operation/Operation.ts";
import IOperationDto from "../../../../Domain/Operation/IOperationDto.ts";

export default interface IFilterOperationsResponse {
    status: boolean,
    operations: IOperationDto[],
    operationsByDate: OperationDateItem[]
    total: number,
    numberOfPages: number,
}
