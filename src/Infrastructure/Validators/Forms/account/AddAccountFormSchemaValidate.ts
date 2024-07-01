import * as yup from 'yup';
import {IOperationTypeEnum} from "../../../../Domain/Operation/Operation.ts";

export const AddAccountFormSchemaValidate = yup.object({
    userId: yup.string().required(),
    name: yup.string().required('Quel est entrer le nom du compte !'),
    type: yup.string().required('Veuillez préciser le type de compte !'),
    icon: yup.string().required('Veuillez sélectionner une icône !'),
    color: yup.string().required('Veuillez sélectionner une couleur !'),
    balance: yup.number().required('Veuillez définir le montant initial !'),
    isIncludeInTotalBalance: yup.boolean().required('Doit t\'il être inclus dans votre solde totale ? '),
})