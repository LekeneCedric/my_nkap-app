import ICategory from "../../../../Domain/Category/Category.ts";

export default interface IGetAllCategoryResponse {
    status: boolean,
    categories: ICategory[],
}