import { IGetAllAccountCommand } from "../../Feature/Account/Thunks/GetAll/GetAllAccountCommand";
import { IGetAllAccountResponse } from "../../Feature/Account/Thunks/GetAll/GetAllAccountResponse";

export default interface IAccountApiGateway {
    getAll: (command: IGetAllAccountCommand) => Promise<IGetAllAccountResponse>
}