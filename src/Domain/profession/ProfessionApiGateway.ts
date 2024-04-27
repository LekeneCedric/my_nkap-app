import IGetAllProfessionResponse from "../../Feature/Profession/Thunks/GetAll/GetAllProfessionResponse";

export interface ProfessionApiGateway {
    getAll: () => Promise<IGetAllProfessionResponse>;
}