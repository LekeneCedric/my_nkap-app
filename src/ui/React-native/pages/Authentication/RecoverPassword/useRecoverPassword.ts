import {useForm, UseFormReturn} from "react-hook-form";
import * as yup from "yup";
import {LoadingState} from "../../../../../Domain/Enums/LoadingState";
import {useAppDispatch, useAppSelector} from "../../../../../app/hook";
import {
  selectAuthenticationLoadingState,
  selectUser,
} from "../../../../../Feature/Authentication/AuthenticationSelector";
import {yupResolver} from "@hookform/resolvers/yup";
import RecoverPasswordAsync from "../../../../../Feature/Authentication/Thunks/RecoverPassword/RecoverPasswordAsync";
import IRecoverPasswordCommand from "../../../../../Feature/Authentication/Thunks/RecoverPassword/RecoverPasswordCommand";
import {useToast} from "react-native-toast-notifications";
import useCustomTranslation from "../../../Shared/Hooks/useCustomTranslation";
import useCustomNavigation from "../../../utils/useNavigation";
import { routes } from "../../routes";

type recoverPasswordForm = {
  email: string,
  code: string;
  password: string;
  passwordConfirmation: string;
};
const recoverPasswordResolver = yup.object({
  email: yup
    .string()
    .required("email_required")
    .email("email_invalid"),
  code: yup
    .string()
    .required("code_required"),
  password: yup
    .string()
    .required("password_required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "confirm_password_invalid")
    .required("confirm_password_required"),
});

type props = {
  form: UseFormReturn<recoverPasswordForm>;
  onSubmit: (data: recoverPasswordForm) => void;
  loadingState: LoadingState;
};

const useRecoverPassword = (): props => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const {navigateByPath} = useCustomNavigation();
  const loadingState = useAppSelector(selectAuthenticationLoadingState);
  const {translate} = useCustomTranslation();
  const form = useForm<recoverPasswordForm>({
    resolver: yupResolver(recoverPasswordResolver),
  });
  const onSubmit = async (data: recoverPasswordForm) => {
    const command = {
      email: data.email,
      code: data.code,
      password: data.password,
    } as IRecoverPasswordCommand;
    
    const response = await dispatch(RecoverPasswordAsync(command));

    if (RecoverPasswordAsync.fulfilled.match(response)) {
      navigateByPath(routes.auth.login);
      toast.show(`${translate("password_reset_message")}`, {
        type: "success",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
      });
      
    } else {
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
    form,
    onSubmit,
    loadingState,
  };
};

export default useRecoverPassword;
