import {IOperationFilterParam} from "../../../../Domain/Operation/Operation.ts";

export default interface IFilterOperationsCommand {
  accountId?: string,
  userId: string,
  page: number,
  limit: number,
  filterParams: IOperationFilterParam
};