import {useForm, UseFormReturn} from "react-hook-form";
import {InputRegisterForm} from "../../../../Infrastructure/Validators/Forms/auth/Register/InputRegisterForm";
import {yupResolver} from "@hookform/resolvers/yup";
import {InputRegisterFormSchemaValidate} from "../../../../Infrastructure/Validators/Forms/auth/Register/InputRegisterFormSchemaValidate";
import {useAppDispatch, useAppSelector} from "../../../../app/hook";
import {RegisterAsync} from "../../../../Feature/Authentication/Thunks/Register/RegisterAsync";
import {IRegisterCommand} from "../../../../Feature/Authentication/Thunks/Register/RegisterCommand";
import {useToast} from "react-native-toast-notifications";
import { selectAuthenticationLoadingState } from "../../../../Feature/Authentication/AuthenticationSelector";
import { LoadingState } from "../../../../Domain/Enums/LoadingState";
import { date } from "yup";

export interface RegisterViewBehaviour {
  form: UseFormReturn<InputRegisterForm>;
  onSubmit: (data: InputRegisterForm) => void;
  loadingState: LoadingState,
}

export const useRegisterView = (): RegisterViewBehaviour => {
  const dispatch = useAppDispatch();
  const loadingState = useAppSelector(selectAuthenticationLoadingState)
  const toast = useToast();

  const form = useForm<InputRegisterForm>({
    resolver: yupResolver(InputRegisterFormSchemaValidate),
  });

  const onSubmit = async (data: InputRegisterForm) => {
    const command = {
      email: data.email,
      username: data.username,
      password: data.password,
      professionId: data.professionId,
      birthday: data.birthday,
    } as IRegisterCommand;
    const response = await dispatch(RegisterAsync(command));
    if (RegisterAsync.fulfilled.match(response)) {
      toast.show('Bienvenue ,'+response.payload.user.username, {
        type: "success",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
      });
    }
    if (RegisterAsync.rejected.match(response)) {
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
    form: form,
    onSubmit: onSubmit,
    loadingState: loadingState,
  };
};
