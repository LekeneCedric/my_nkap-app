import * as yup from "yup";
import {IOperationTypeEnum} from "../../../../Domain/Operation/Operation.ts";

const dateFormatRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;

export const AddOperationFormSchemaValidate = yup.object({
    accountId: yup
        .string()
        .required('Veuillez sélectionner le compte liée à cette opération !'),
    type: yup
        .number()
        .oneOf(Object.values(IOperationTypeEnum), 'Type d\'opération invalide')
        .required('Veuillez sélectionner le type de l\'opération !'),
    amount: yup
        .number()
        .moreThan(0, 'Le montant se doit dêtre supérieur à 0')
        .required('Veuillez entrez le montant de l\'opération'),
    categoryId: yup
        .string()
        .required('Veuillez sélectionner une catégorie pour cette opération'),
    details: yup
        .string(),
    date: yup
        .string()
        .matches(dateFormatRegex)
        .required('Veuillez sélectionner la date à laquelle a été éffectué cette opération !'),
})