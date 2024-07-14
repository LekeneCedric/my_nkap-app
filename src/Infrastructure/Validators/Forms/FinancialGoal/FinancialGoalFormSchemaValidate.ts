import * as yup from 'yup';
import FinancialGoalForm from "./FinancialGoalForm.ts";

const dateFormatRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;

const FinancialGoalFormSchemaValidate = yup.object({
    userId: yup
        .string()
        .required(),
    accountId: yup
        .string()
        .required(),
    startDate: yup
        .string()
        .matches(dateFormatRegex)
        .required('Entrez la date de début'),
    endDate: yup
        .string()
        .matches(dateFormatRegex)
        .required('Entrez la date de fin'),
    desiredAmount: yup
        .number()
        .moreThan(0, 'Le montant se doit être supérieur à 0')
        .required('Entrez le montant que vous souhaiter atteindre !'),
    details: yup
        .string()
        .required('Entrez les détails de votre objectif !'),
});
export default FinancialGoalFormSchemaValidate;