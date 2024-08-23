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
import useCustomTranslation from "../../../../Shared/Hooks/useCustomTranslation.ts";

export const RegisterForm = ({registerFormBehaviour,}: {
    registerFormBehaviour: RegisterViewBehaviour;
}) => {
    const {translate} = useCustomTranslation();
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
                        label={translate('user_name')}
                        errorMessage={errors.username?.message}
                        field={field}
                        keyboardType={"default"}
                        placeholder={translate('user_name_placeholder')}
                    />
                )}
            />
            <Controller
                control={control}
                name={"email"}
                render={({field}) => (
                    <InputForm
                        icon={Icons.email}
                        label={translate('email')}
                        errorMessage={errors.email?.message}
                        field={field}
                        keyboardType={"email-address"}
                        placeholder={translate('email_placeholder')}
                    />
                )}
            />
            <Controller
                control={control}
                name={"birthday"}
                render={({field}) => (
                    <InputBirthdayForm
                        mode={'date'}
                        label={translate('date_of_birth')}
                        errorMessage={errors.birthday?.message}
                        field={field}
                        placeholder={translate('date_of_birth_placeholder')}
                    />
                )}
            />
            {
                professionLoadingState === LoadingState.pending && (
                    <Loading message={translate('professions_loading')}/>
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
                                label={translate('profession')}
                                errorMessage={errors.professionId?.message}
                                field={field}
                                placeholder={translate('profession_placeholder')}
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
                        <Text>{translate('try')}</Text>
                    </TouchableOpacity>
                )
            }


            <Controller
                control={control}
                name={"password"}
                render={({field}) => (
                    <InputPasswordForm
                        label={translate('password')}
                        errorMessage={errors.password?.message}
                        field={field}
                        placeholder={translate('password_placeholder')}
                    />
                )}
            />

            <Controller
                control={control}
                name={"passwordConfirmation"}
                render={({field}) => (
                    <InputPasswordForm
                        label={translate('confirm_password')}
                        errorMessage={errors.passwordConfirmation?.message}
                        field={field}
                        placeholder={translate('confirm_password_placeholder')}
                    />
                )}
            />
            <VerticalSeparator percent={2}/>
            <ButtonForm
                label={translate('register_title')}
                loadingLabel={translate('pending_register')}
                handleClick={handleSubmit(onSubmit)}
                loading={loadingState}
            />

        </View>
    );
};
