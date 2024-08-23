import * as yup from 'yup';
export const AddCategoryFormSchemaValidate = yup.object({
    color: yup
        .string()
        .required('category_color_required'),
    icon: yup
        .string()
        .required('category_icon_required'),
    name: yup
        .string()
        .required('category_name_required'),
})