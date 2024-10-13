import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import RecoverPasswordStyles from "./RecoverPassword.styles";
import useTheme from "../../../Shared/Hooks/useTheme";
import Animated, { BounceInDown, BounceInUp, LightSpeedInLeft, LightSpeedInRight } from "react-native-reanimated";
import TextStyles from "../../../Global/Styles/Text.styles";
import useCustomTranslation from "../../../Shared/Hooks/useCustomTranslation";
import useRecoverPassword from "./useRecoverPassword";
import VerticalSeparator from "../../../Components/Shared/VerticalSeparator/VerticalSeparator";
import ButtonForm from "../../../Components/Forms/Button/ButtonForm";
import { Controller } from "react-hook-form";
import { InputForm } from "../../../Components/Forms/Input/InputForm";
import { Icons } from "../../../Global/Icons";
import InputPasswordForm from "../../../Components/Forms/InputPassword/InputPasswordForm";

const RecoverPasswordView = () => {
    const {colorPalette: {pageBackground, containerBackground, text, action1}} = useTheme();
    const {translate} = useCustomTranslation();
    const styles = RecoverPasswordStyles(containerBackground, pageBackground);
    const {form, loadingState, onSubmit} = useRecoverPassword();
    const {
        formState: {errors},
        control,
        handleSubmit
    } = form;
    return <SafeAreaView style={styles.pageContainer}>
            <Animated.View
            entering={BounceInUp.duration(0)}
            style={styles.formHeader}>
                <View style={styles.titleContainer}>
                    <Animated.Text
                    entering={LightSpeedInLeft.duration(1500)}
                    exiting={LightSpeedInRight.duration(1500)}
                    style={[TextStyles.title, {textAlign: "center", color: action1}]}
                    >
                        {translate("recover_password_title")}
                    </Animated.Text>
                    <Animated.Text
                    entering={LightSpeedInLeft.duration(1500)}
                    exiting={LightSpeedInRight.duration(1500)}
                    style={[
                        TextStyles.description,
                        {textAlign: "center", color: text},
                    ]}
                    >
                    {translate("recover_password_description")}
                    </Animated.Text>
                </View>
            </Animated.View>
            <Animated.View
                entering={BounceInDown.duration(1000)}
                exiting={BounceInUp}
                style={styles.formContainer}>
                    <ScrollView style={{flex: 1}}>
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
                            name={"code"}
                            control={control}
                            render={({field}) => (
                                <InputForm
                                    icon={Icons.send}
                                    label={translate("code")}
                                    errorMessage={errors.code?.message}
                                    field={field}
                                    keyboardType={'number-pad'}
                                    placeholder={translate("code_placeholder")}
                                />
                            )}
                        />
                        <Controller
                            name={"password"}
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
                        <Controller
                            name={"passwordConfirmation"}
                            control={control}
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
                            loading={loadingState}
                            loadingLabel={translate("pending_recover_password")}
                            label={translate("recover_password")}
                            handleClick={handleSubmit(onSubmit)}
                        />
                    </ScrollView>
            </Animated.View>
    </SafeAreaView>
};

export default RecoverPasswordView;