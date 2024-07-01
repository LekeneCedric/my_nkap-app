import { IGetAllAccountCommand } from "../../Feature/Account/Thunks/GetAll/GetAllAccountCommand";
import { IGetAllAccountResponse } from "../../Feature/Account/Thunks/GetAll/GetAllAccountResponse";
import ISaveAccountCommand from "../../Feature/Account/Thunks/Save/SaveAccountCommand.ts";
import ISaveAccountResponse from "../../Feature/Account/Thunks/Save/SaveAccountResponse.ts";
import DeleteAccountCommand from "../../Feature/Account/Thunks/Delete/DeleteAccountCommand.ts";
import DeleteAccountResponse from "../../Feature/Account/Thunks/Delete/DeleteAccountResponse.ts";

export default interface IAccountApiGateway {
    getAll: (command: IGetAllAccountCommand) => Promise<IGetAllAccountResponse>
    save: (command: ISaveAccountCommand) => Promise<ISaveAccountResponse>;
    deleteAccount: (command: DeleteAccountCommand) => Promise<DeleteAccountResponse>;
}