import {ScrollView, TouchableOpacity, View} from "react-native";
import {RegisterViewBehaviour} from "../UseRegisterView";
import {Controller} from "react-hook-form";
import {InputForm} from "../../../../Components/Forms/Input/InputForm";
import VerticalSeparator from "../../../../Components/Shared/VerticalSeparator/VerticalSeparator";
import {Icons} from "../../../../Global/Icons";
import InputBirthdayForm from "../../../../Components/Forms/InputBirthDate/InputBirthDateForm";
import SelectForm from "../../../../Components/Forms/Select/SelectForm";
import ButtonForm from "../../../../Components/Forms/Button/ButtonForm";
import InputPasswordForm from "../../../../Components/Forms/InputPassword/InputPasswordForm";
import useRegisterFormView from "./useRegisterFormView";
import {LoadingState} from "../../../../../../Domain/Enums/LoadingState";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Text} from "react-native";
import {IconSizes} from "../../../../Global/IconSizes";
import Loading from "../../../../Components/Loading/Loading";

export const RegisterForm = ({
                                 registerFormBehaviour,
                             }: {
    registerFormBehaviour: RegisterViewBehaviour;
}) => {
    const {form, onSubmit, loadingState} = registerFormBehaviour;
    const {refresh, professions, loadingState: professionLoadingState} = useRegisterFormView();
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
                        mode={'date'}
                        label={"Date de naissance"}
                        errorMessage={errors.birthday?.message}
                        field={field}
                        placeholder={"Selectionnez votre date de naissance"}
                    />
                )}
            />
            {
                professionLoadingState === LoadingState.pending && (
                    <Loading message={'chargement des professions'}/>
                )
            }
            {
                (professions.length > 0) && (
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
                                list={professions}
                            />
                        )}
                    />
                )
            }
            {
                (
                    (professionLoadingState === LoadingState.failed || professions.length == 0)
                    && professionLoadingState !== LoadingState.pending) && (
                    <TouchableOpacity onPress={refresh}
                                      style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Icon name={Icons.refresh} size={IconSizes.normal}/>
                        <Text>Reessayer</Text>
                    </TouchableOpacity>
                )
            }


            <Controller
                control={control}
                name={"password"}
                render={({field}) => (
                    <InputPasswordForm
                        label={"Mot de passe"}
                        errorMessage={errors.password?.message}
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
                        errorMessage={errors.passwordConfirmation?.message}
                        field={field}
                    />
                )}
            />
            <VerticalSeparator percent={2}/>
            <ButtonForm
                label={"Inscription"}
                loadingLabel={'Inscription en cours...'}
                handleClick={handleSubmit(onSubmit)}
                loading={loadingState}
            />

        </View>
    );
};
