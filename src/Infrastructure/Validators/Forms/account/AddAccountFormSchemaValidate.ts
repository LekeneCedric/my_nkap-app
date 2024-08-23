import * as yup from 'yup';

export const AddAccountFormSchemaValidate = yup.object({
    userId: yup.string().required(),
    name: yup.string().required('account_name_required'),
    type: yup.string().required('account_type_required'),
    icon: yup.string().required('account_icon_required'),
    color: yup.string().required('account_color_required'),
    balance: yup.number().required('account_balance_required'),
    isIncludeInTotalBalance: yup.boolean().required('account_is_include_in_total_balance_required'),
})