import IGetAllProfessionResponse from "../../../Feature/Profession/Thunks/GetAll/GetAllProfessionResponse";

export default class GetAllProfessionResponseFactory {
    public static buildFromApi = (result: any): IGetAllProfessionResponse => {
        return {
            professions: result.professions,
        }
    }
}