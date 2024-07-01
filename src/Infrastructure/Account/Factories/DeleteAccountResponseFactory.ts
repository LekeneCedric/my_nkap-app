import DeleteAccountResponse from "../../../Feature/Account/Thunks/Delete/DeleteAccountResponse.ts";

export default class DeleteAccountResponseFactory {

    static buildFromApiResponse(result: any) : DeleteAccountResponse {
        return {
            status: result.status,
            isDeleted: result.isDeleted,
            accountId: result.accountId,
            message: result.message,
        }
    }
}