import {useForm, UseFormReturn} from "react-hook-form";
import InputLoginForm from "../../../../../Infrastructure/Validators/Forms/auth/Login/InputLoginForm";
import {yupResolver} from "@hookform/resolvers/yup";
import {InputLoginFormFormSchemaValidate} from "../../../../../Infrastructure/Validators/Forms/auth/Login/InputLoginFormFormSchemaValidate";
import {useAppDispatch, useAppSelector} from "../../../../../app/hook";
import {selectAuthenticationLoadingState} from "../../../../../Feature/Authentication/AuthenticationSelector";
import {useToast} from "react-native-toast-notifications";
import {LoadingState} from "../../../../../Domain/Enums/LoadingState";
import {LoginAsync} from "../../../../../Feature/Authentication/Thunks/Login/LoginAsync";
import ILoginCommand from "../../../../../Feature/Authentication/Thunks/Login/LoginCommand";

export interface LoginFormBehaviour {
  form: UseFormReturn<InputLoginForm>;
  onSubmit: (data: InputLoginForm) => void;
  loadingState: LoadingState;
}

interface UseLoginViewBehaviour {
  loginFormBehaviour: LoginFormBehaviour;
}

export const UseLoginView = (): UseLoginViewBehaviour => {
  const dispatch = useAppDispatch();
  const loadingState = useAppSelector(selectAuthenticationLoadingState);
  const toast = useToast();

  const form = useForm<InputLoginForm>({
    resolver: yupResolver(InputLoginFormFormSchemaValidate),
  });

  const onSubmit = async (data: InputLoginForm) => {
    const command = {
      email: data.email,
      password: data.password,
    } as ILoginCommand;
    const response = await dispatch(LoginAsync(command));
    console.warn(response);
    if (LoginAsync.fulfilled.match(response)) {
      toast.show(response.payload.message, {
        type: "success",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
      });
    }
    if (LoginAsync.rejected.match(response)) {
      //@ts-ignore
      toast.show(response.payload.message, {
        type: "danger",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
      });
    }
  };

  return {
    loginFormBehaviour: {
      form: form,
      onSubmit: onSubmit,
      loadingState: loadingState,
    },
  };
};
