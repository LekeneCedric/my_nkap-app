import { View } from "react-native";
import { InputForm } from "../../../../Components/Forms/Input/InputForm.tsx";
import { LoginFormBehaviour } from "../UseLoginView.ts";
import { Controller } from "react-hook-form";
import VerticalSeparator from "../../../../Components/Shared/VerticalSeparator/VerticalSeparator.tsx";
import ButtonForm from "../../../../Components/Forms/Button/ButtonForm.tsx";
import InputPasswordForm from "../../../../Components/Forms/InputPassword/InputPasswordForm.tsx";
import { Icons } from "../../../../Global/Icons.ts";
import useTheme from "../../../../Shared/Hooks/useTheme.ts";

export const LoginForm = (
  {loginFormBehaviour}: {loginFormBehaviour: LoginFormBehaviour}
) => {
  const {form, onSubmit, loadingState} = loginFormBehaviour;
  const {formState: {errors}, control, handleSubmit, } = form
  return (<View style={{flexDirection: 'column'}}>
    <Controller
      name={'email'}
      control={control}
      render={({field}) => (
        <InputForm 
          icon={Icons.email}
          label={'Adresse e-mail'}
          errorMessage={errors.email?.message}
          field={field}
          keyboardType={'email-address'}
          placeholder={'Entrez votre adresse e-mail'}

        />
      )}
    />
    <VerticalSeparator percent={1} />
    <Controller
      name={'password'}
      control={control}
      render={({field}) => (
        <InputPasswordForm
          label={'Mot de passe'}
          errorMessage={errors.password?.message}
          field={field}
        />
      )}
    />
    <VerticalSeparator percent={5} />
    <ButtonForm loading={loadingState} loadingLabel={'Connexion en cours...'} label={'connexion'} handleClick={handleSubmit(onSubmit)} />
  </View>)
}
