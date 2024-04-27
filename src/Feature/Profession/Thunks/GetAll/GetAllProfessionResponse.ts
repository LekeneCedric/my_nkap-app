import { IProfession } from "../../../../Domain/profession/Profession";

export default interface IGetAllProfessionResponse {
    professions: IProfession[],
}