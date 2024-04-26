import { useForm, UseFormReturn } from "react-hook-form";
import { InputRegisterForm } from "../../../../Infrastructure/Validators/Forms/auth/Register/InputRegisterForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputRegisterFormSchemaValidate } from "../../../../Infrastructure/Validators/Forms/auth/Register/InputRegisterFormSchemaValidate";

export interface RegisterViewBehaviour {
    form: UseFormReturn<InputRegisterForm>
    onSubmit: (data: InputRegisterForm) => void,
}

export const useRegisterView = (): RegisterViewBehaviour => {

    const form = useForm<InputRegisterForm>({
        resolver: yupResolver(InputRegisterFormSchemaValidate)
    });

    const onSubmit = (data: InputRegisterForm) => {
        console.log(data);
    }
    return {
        form: form,
        onSubmit: onSubmit,
    };
}