import {yupResolver} from "@hookform/resolvers/yup";
import {useForm, UseFormReturn} from "react-hook-form";
import * as yup from "yup";
import {LoadingState} from "../../../../../Domain/Enums/LoadingState";
import {useAppDispatch, useAppSelector} from "../../../../../app/hook";
import {selectAuthenticationLoadingState} from "../../../../../Feature/Authentication/AuthenticationSelector";
import useCustomNavigation from "../../../utils/useNavigation";
import {AuthRoutes} from "../../routes/AuthRoutes";
import ISendRecoverPasswordCodeCommand from "../../../../../Feature/Authentication/Thunks/SendRecoverPasswordCode/SendRecoverPasswordCodeCommand";
import {useToast} from "react-native-toast-notifications";
import SendRecoverPasswordCodeAsync from "../../../../../Feature/Authentication/Thunks/SendRecoverPasswordCode/SendRecoverPasswordCodeAsync";
import useCustomTranslation from "../../../Shared/Hooks/useCustomTranslation";

type sendRecoverPasswordCodeForm = {
  email: string;
};
type props = {
  form: UseFormReturn<sendRecoverPasswordCodeForm>;
  onSubmit: (data: sendRecoverPasswordCodeForm) => void;
  loadingState: LoadingState;
};
const useSendRecoverPasswordCode = (): props => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const {translate} = useCustomTranslation();
  const loadingState = useAppSelector(selectAuthenticationLoadingState);
  const {navigateByPath} = useCustomNavigation();
  const form = useForm<sendRecoverPasswordCodeForm>({
    resolver: yupResolver(
      yup.object({
        email: yup.string().required("email_required").email("email_invalid"),
      }),
    ),
  });

  const onSubmit = async (data: sendRecoverPasswordCodeForm) => {
    const command = {email: data.email} as ISendRecoverPasswordCodeCommand;
    const response = await dispatch(SendRecoverPasswordCodeAsync(command));
    if (SendRecoverPasswordCodeAsync.fulfilled.match(response)) {
      navigateByPath(AuthRoutes.recover_password);
      toast.show(`${translate(response.payload.message)}`, {
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

export default useSendRecoverPasswordCode;
