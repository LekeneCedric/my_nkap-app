import {useForm, UseFormReturn} from "react-hook-form";
import InputLoginForm from "../../../../../Infrastructure/Validators/Forms/auth/Login/InputLoginForm";
import {yupResolver} from "@hookform/resolvers/yup";
import {InputLoginFormFormSchemaValidate} from "../../../../../Infrastructure/Validators/Forms/auth/Login/InputLoginFormFormSchemaValidate";
import {useAppDispatch, useAppSelector} from "../../../../../app/hook";
import {
  selectAuthenticationLoadingState,
  selectUser,
} from "../../../../../Feature/Authentication/AuthenticationSelector";
import {useToast} from "react-native-toast-notifications";
import {LoadingState} from "../../../../../Domain/Enums/LoadingState";
import {LoginAsync} from "../../../../../Feature/Authentication/Thunks/Login/LoginAsync";
import ILoginCommand from "../../../../../Feature/Authentication/Thunks/Login/LoginCommand";
import useCustomTranslation from "../../../Shared/Hooks/useCustomTranslation.ts";
import {SetActivationAccountEmail} from "../../../../../Feature/Authentication/AuthenticationSlice.ts";
import GetAllCategoryAsync from "../../../../../Feature/Category/Thunks/GetAll/GetAllCategoryAsync.ts";
import IGetAllCategoryCommand from "../../../../../Feature/Category/Thunks/GetAll/GetAllCategoryCommand.ts";

export interface LoginFormBehaviour {
  form: UseFormReturn<InputLoginForm>;
  onSubmit: (data: InputLoginForm) => void;
  loadingState: LoadingState;
}

interface UseLoginViewBehaviour {
  loginFormBehaviour: LoginFormBehaviour;
}

export const UseLoginView = (): UseLoginViewBehaviour => {
  const {translate} = useCustomTranslation();
  const dispatch = useAppDispatch();
  const loadingState = useAppSelector(selectAuthenticationLoadingState);
  const toast = useToast();
  const form = useForm<InputLoginForm>({
    resolver: yupResolver(InputLoginFormFormSchemaValidate),
  });

  const getAllCategories = async (userId: string) => {
    const command = {
      userId: userId ? userId : "",
    } as IGetAllCategoryCommand;
    await dispatch(GetAllCategoryAsync(command));
  };

  const onSubmit = async (data: InputLoginForm) => {
    const command = {
      email: data.email,
      password: data.password,
    } as ILoginCommand;
    const response = await dispatch(LoginAsync(command));
    if (LoginAsync.fulfilled.match(response)) {
      await getAllCategories(response.payload.user.userId);
      toast.show(`${translate("welcome")} ${response.payload.message}`, {
        type: "success",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
      });
    }
    if (LoginAsync.rejected.match(response)) {
      //@ts-ignore
      toast.show(translate(response.payload.message), {
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
