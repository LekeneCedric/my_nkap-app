import * as yup from 'yup';
import FinancialGoalForm from "./FinancialGoalForm.ts";

const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

const FinancialGoalFormSchemaValidate = yup.object({
    financialGoalId: yup
        .string(),
    userId: yup
        .string()
        .required(),
    accountId: yup
        .string()
        .required('financial_goal_account_required'),
    startDate: yup
        .string()
        .matches(dateFormatRegex)
        .required('financial_goal_start_date_required'),
    endDate: yup
        .string()
        .matches(dateFormatRegex)
        .required('financial_goal_end_date_required'),
    desiredAmount: yup
        .number()
        .moreThan(0, 'financial_goal_desired_amount_greater_than_0')
        .required('financial_goal_desired_amount_required'),
    details: yup
        .string()
        .required('financial_goal_title_required'),
});
export default FinancialGoalFormSchemaValidate;