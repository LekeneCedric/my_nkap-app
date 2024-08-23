import * as yup from 'yup';

export const InputLoginFormFormSchemaValidate = yup.object({
    email: yup
        .string()
        .required("email_required")
        .email("email_invalid"),
    password: yup
        .string()
        .required("password_required")
})