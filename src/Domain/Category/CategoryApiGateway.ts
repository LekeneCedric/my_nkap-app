import IGetAllCategoryCommand from "../../Feature/Category/Thunks/GetAll/GetAllCategoryCommand.ts";
import IGetAllCategoryResponse from "../../Feature/Category/Thunks/GetAll/GetAllCategoryResponse.ts";
import ISaveCategoryCommand from "../../Feature/Category/Thunks/Save/SaveCategoryCommand.ts";
import ISaveCategoryResponse from "../../Feature/Category/Thunks/Save/SaveCategoryResponse.ts";

export default interface ICategoryApiGateway {
    getAll: (command: IGetAllCategoryCommand) => Promise<IGetAllCategoryResponse>,
    save: (command: ISaveCategoryCommand) => Promise<ISaveCategoryResponse>,
    // delete: (command: IDeleteCategoryCommand) => Promise<IDeleteCategoryResponse>
}