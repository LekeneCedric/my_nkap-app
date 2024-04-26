import * as yup from 'yup';

export const InputLoginFormFormSchemaValidate = yup.object({
    email: yup
        .string()
        .required("L'adresse e-mail est requise !")
        .email("Entrez une adresse e-mail valide !"),
    password: yup
        .string()
        .required("Le mot de passe est requis !")
})