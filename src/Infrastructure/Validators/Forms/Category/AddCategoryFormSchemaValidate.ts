import * as yup from 'yup';
export const AddCategoryFormSchemaValidate = yup.object({
    color: yup
        .string()
        .required('choisissez une couleur !'),
    icon: yup
        .string()
        .required('Choisissez une icone !'),
    name: yup
        .string()
        .required('Renseignez un nom !'),
})