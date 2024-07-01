import ISaveAccountResponse from "../../../Feature/Account/Thunks/Save/SaveAccountResponse.ts";

export default class SaveAccountResponseFactory {
    static buildFromApiResponse (result: any): ISaveAccountResponse {
        return {
            status: result.status,
            isSaved: result.isSaved,
            accountId: result.accountId,
            message: result.message,
        }
    }
}