import ISaveCategoryResponse from "../../../Feature/Category/Thunks/Save/SaveCategoryResponse.ts";

export default class SaveCategoryResponseFactory {

    static fromApi(result: any): ISaveCategoryResponse {
        return {
            status: result.status,
            isSaved: result.isSaved,
            message: result.message,
            categoryId: result.categoryId,
        }
    }
}