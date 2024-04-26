import {ScrollView, View} from "react-native";
import {RegisterViewBehaviour} from "../UseRegisterView";
import {Controller} from "react-hook-form";
import {InputForm} from "../../../../Components/Forms/Input/InputForm";
import VerticalSeparator from "../../../../Components/Shared/VerticalSeparator/VerticalSeparator";
import {Icons} from "../../../../Global/Icons";
import InputBirthdayForm from "../../../../Components/Forms/InputBirthDate/InputBirthDateForm";
import SelectForm from "../../../../Components/Forms/Select/SelectForm";
import ButtonForm from "../../../../Components/Forms/Button/ButtonForm";
import InputPasswordForm from "../../../../Components/Forms/InputPassword/InputPasswordForm";

export const RegisterForm = ({
  registerFormBehaviour,
}: {
  registerFormBehaviour: RegisterViewBehaviour;
}) => {
  const {form, onSubmit} = registerFormBehaviour;
  const {
    formState: {errors},
    handleSubmit,
    control,
  } = form;
  return (
      <View>
        <Controller
          control={control}
          name={"username"}
          render={({field}) => (
            <InputForm
              icon={Icons.user}
              label={"Nom d'utilisateur"}
              errorMessage={errors.username?.message}
              field={field}
              keyboardType={"default"}
              placeholder={"Entrez votre nom d'utilisateur"}
            />
          )}
        />
        <Controller
          control={control}
          name={"email"}
          render={({field}) => (
            <InputForm
              icon={Icons.email}
              label={"Adresse e-mail"}
              errorMessage={errors.email?.message}
              field={field}
              keyboardType={"email-address"}
              placeholder={"Entrez votre adresse e-mail"}
            />
          )}
        />
        <Controller
          control={control}
          name={"birthday"}
          render={({field}) => (
            <InputBirthdayForm
              label={"Date de naissance"}
              errorMessage={errors.birthday?.message}
              field={field}
              placeholder={"Selectionnez votre date de naissance"}
            />
          )}
        />
        <Controller
          control={control}
          name={"professionId"}
          render={({field}) => (
            <SelectForm
              icon={Icons.work}
              label={"Profession"}
              errorMessage={errors.professionId?.message}
              field={field}
              placeholder={"Selectionnez votre profession"}
              list={[
                {name: "Accompagnant éducatif et social"},
                {name: "Accompagnateur de tourisme équestre"},
                {name: "Accompagnateur de voyages"},
                {name: "Accompagnateur en moyenne montagne"},
                {name: "Acheteur"},
                {name: "Acheteur d'espaces publicitaires"},
                {name: "Acheteur international"},
                {name: "Acheteur-Vendeur"},
                {name: "Acousticien"},
                {name: "Actrice"},
                {name: "Actuaire"},
                {name: "Adjoint de direction"},
                {name: "Administrateur de base de données"},
                {name: "Administrateur de bases de données"},
                {name: "Administrateur de biens"},
                {name: "Administrateur de salle de spectacles"},
                {name: "Administrateur réseaux"},
                {name: "Aérodynamicien"},
                {name: "Affréteur"},
                {name: "Agenceur d'intérieur bois"},
                {name: "Agencier"},
                {name: "Agent à domicile"},
                {name: "Agent administratif"},
                {name: "Agent artistique"},
                {name: "Agent d'élevage"},
                {name: "Agent d'entretien"},
                {name: "Agent d'entretien et de rénovation"},
                {name: "Agent d'escale"},
                {name: "Agent de bord"},
                {name: "Agent de circulation"},
                {name: "Agent de circulation et d’accueil"},
                {name: "Agent de développement des énergies renouvelables"},
                {name: "Agent de développement sportif Parcours"},
                {name: "Agent de petite maintenance"},
                {name: "Agent de piste"},
                {name: "Agent de planning"},
              ]}
            />
          )}
        />

        <Controller
          control={control}
          name={"password"}
          render={({field}) => (
            <InputPasswordForm
              label={"Mot de passe"}
              errorMessage={errors.professionId?.message}
              field={field}
            />
          )}
        />

        <Controller
          control={control}
          name={"passwordConfirmation"}
          render={({field}) => (
            <InputPasswordForm
              label={"Confirmation mot de passe"}
              errorMessage={errors.professionId?.message}
              field={field}
            />
          )}
        />
        <VerticalSeparator percent={2} />
        <ButtonForm
          label={"Inscription"}
          handleClick={handleSubmit(onSubmit)}
        />
      </View>
  );
};
