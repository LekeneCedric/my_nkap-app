import { useForm, UseFormReturn } from "react-hook-form"
import InputLoginForm from "../../../../Infrastructure/Validators/Forms/auth/Login/InputLoginForm"
import {yupResolver} from '@hookform/resolvers/yup';
import { InputLoginFormFormSchemaValidate } from "../../../../Infrastructure/Validators/Forms/auth/Login/InputLoginFormFormSchemaValidate";

export interface LoginFormBehaviour {
    form: UseFormReturn<InputLoginForm>,
    onSubmit: (data: InputLoginForm) => void,
}

interface UseLogiViewBehaviour {
    loginFormBehaviour: LoginFormBehaviour  
}

export const UseLoginView = () : UseLogiViewBehaviour => {

    const form = useForm<InputLoginForm>({
        resolver: yupResolver(InputLoginFormFormSchemaValidate)
    })
    
    const onSubmit = (data: InputLoginForm) => {
        
    }

    return {
        loginFormBehaviour: {
            form: form,
            onSubmit: onSubmit,
        }
    }
}