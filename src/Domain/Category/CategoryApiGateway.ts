import IGetAllCategoryCommand from "../../Feature/Category/Thunks/GetAll/GetAllCategoryCommand.ts";
import IGetAllCategoryResponse from "../../Feature/Category/Thunks/GetAll/GetAllCategoryResponse.ts";

export default interface ICategoryApiGateway {
    getAll: (command: IGetAllCategoryCommand) => Promise<IGetAllCategoryResponse>,
    save: (command: ISaveCategoryCommand) => Promise<ISaveCategoryResponse>,
    delete: (command: IDeleteCategoryCommand) => Promise<IDeleteCategoryResponse>
}