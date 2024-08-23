import * as yup from "yup";

// const dateSchema = yup.string().transform((originalValue, originalObject) => {
//   // Use a regular expression to match the date pattern "DD-MM-YYYY"
//   const dateRegex = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
//
//   // Check if the date string matches the pattern
//   const match = originalValue.match(dateRegex);
//
//   // If the date string doesn't match the pattern, return undefined
//   if (!match) {
//     return undefined;
//   }
//
//   // Extract the year, day, and month from the matched groups
//   const day = parseInt(match[1], 10);
//   const month = parseInt(match[2], 10);
//   const year = parseInt(match[3], 10);
//
//   // Create a JavaScript Date object using the extracted values
//   const date = new Date(year, month - 1, day);
//
//   // Check if the date is valid (accounting for month indexing starting from 0)
//   if (
//     date.getFullYear() === year &&
//     date.getMonth() === month - 1 &&
//     date.getDate() === day
//   ) {
//     // If the date is valid, return it as a string
//     return originalValue;
//   }
//
//   return undefined;
// });
const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

export const InputRegisterFormSchemaValidate = yup.object({
    username: yup.string().required("user_name_required"),
    email: yup
        .string()
        .email("email_invalid")
        .required("email_required"),
    birthday: yup
        .string()
        .matches(dateFormatRegex)
        .required("date_of_birth_required"),
    professionId: yup.string().required("profession_required"),
    password: yup.string().required("password_required"),
    passwordConfirmation: yup
        .string()
        .oneOf(
            [yup.ref("password")],
            "confirm_password_invalid",
        )
        .required("confirm_password_required"),
});
