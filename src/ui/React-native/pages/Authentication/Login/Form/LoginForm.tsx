import { View } from "react-native";
import { InputForm } from "../../../../Components/Forms/Input/InputForm.tsx";
import { LoginFormBehaviour } from "../UseLoginView.ts";
import { Controller } from "react-hook-form";
import VerticalSeparator from "../../../../Components/Shared/VerticalSeparator/VerticalSeparator.tsx";
import ButtonForm from "../../../../Components/Forms/Button/ButtonForm.tsx";
import InputPasswordForm from "../../../../Components/Forms/InputPassword/InputPasswordForm.tsx";
import { Icons } from "../../../../Global/Icons.ts";
import useTheme from "../../../../Shared/Hooks/useTheme.ts";
import useCustomTranslation from "../../../../Shared/Hooks/useCustomTranslation.ts";

export const LoginForm = (
  {loginFormBehaviour}: {loginFormBehaviour: LoginFormBehaviour}
) => {
  const {
    translate
  } = useCustomTranslation();
  const {form, onSubmit, loadingState} = loginFormBehaviour;
  const {formState: {errors}, control, handleSubmit, } = form
  return (<View style={{flexDirection: 'column'}}>
    <Controller
      name={'email'}
      control={control}
      render={({field}) => (
        <InputForm 
          icon={Icons.email}
          label={translate('email')}
          errorMessage={errors.email?.message}
          field={field}
          keyboardType={'email-address'}
          placeholder={translate('email_placeholder')}

        />
      )}
    />
    <Controller
      name={'password'}
      control={control}
      render={({field}) => (
        <InputPasswordForm
          label={translate('password')}
          errorMessage={errors.password?.message}
          field={field}
          placeholder={translate('password_placeholder')}
        />
      )}
    />
    <VerticalSeparator percent={2} />
    <ButtonForm loading={loadingState} loadingLabel={translate('pending_connexion')} label={'connexion'} handleClick={handleSubmit(onSubmit)} />
  </View>)
}
