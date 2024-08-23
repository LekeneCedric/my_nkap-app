import * as yup from "yup";
import {IOperationTypeEnum} from "../../../../Domain/Operation/Operation.ts";

const dateFormatRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;

export const AddOperationFormSchemaValidate = yup.object({
    accountId: yup
        .string()
        .required('operation_target_account_is_required'),
    type: yup
        .number()
        //@ts-ignore
        .oneOf(Object.values(IOperationTypeEnum), 'Type d\'opération invalide')
        .required('operation_type_is_required'),
    amount: yup
        .number()
        .moreThan(0, 'operation_amount_must_be_greater_than_0')
        .required('operation_amount_is_required'),
    categoryId: yup
        .string()
        .required('operation_category_is_required'),
    details: yup
        .string(),
    date: yup
        .string()
        .matches(dateFormatRegex)
        .required('operation_date_is_required'),
})