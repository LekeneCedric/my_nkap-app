import IGetAllCategoryResponse from "../../../Feature/Category/Thunks/GetAll/GetAllCategoryResponse.ts";
import ICategory from "../../../Domain/Category/Category.ts";

export default class GetAllCategoryResponseFactory {
    static fromApi(result: any): IGetAllCategoryResponse {
        return {
            status: result.status,
            categories: result.categories.map((category: any): ICategory => {
                return {
                    id: category.categoryId,
                    name: category.name,
                    color: category.color,
                    description: category.description,
                    icon: category.icon
                }
            })
        }
    }
}