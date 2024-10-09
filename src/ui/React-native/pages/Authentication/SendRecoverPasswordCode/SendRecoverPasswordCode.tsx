import React from "react";
import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import SendRecoverPasswordCodeStyles from "./SendRecoverPasswordCode.styles";
import useTheme from "../../../Shared/Hooks/useTheme";
import Animated, {
  BounceInDown,
  BounceInUp,
  LightSpeedInLeft,
  LightSpeedInRight,
} from "react-native-reanimated";
import useCustomTranslation from "../../../Shared/Hooks/useCustomTranslation";
import TextStyles from "../../../Global/Styles/Text.styles";
import {Controller} from "react-hook-form";
import {InputForm} from "../../../Components/Forms/Input/InputForm";
import {Icons} from "../../../Global/Icons";
import useSendRecoverPasswordCode from "./useSendRecoverPasswordCode";
import VerticalSeparator from "../../../Components/Shared/VerticalSeparator/VerticalSeparator";
import ButtonForm from "../../../Components/Forms/Button/ButtonForm";
import { hp, wp } from "../../../Global/Percentage";
import { FontSize } from "../../../Global/FontSize";
import useCustomNavigation from "../../../utils/useNavigation";
import { routes } from "../../routes";

const sendRecoverPasswordCode = () => {
  const {translate} = useCustomTranslation();
  const {navigateByPath} = useCustomNavigation();
  const {
    colorPalette: {pageBackground, containerBackground, action1, text},
  } = useTheme();
  const styles = SendRecoverPasswordCodeStyles(
    pageBackground,
    containerBackground,
  );
  const {form, loadingState, onSubmit} = useSendRecoverPasswordCode();
  const {
    formState: {errors},
    control,
    handleSubmit,
  } = form;

  return (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView>
        <Animated.View
          entering={BounceInUp.duration(0)}
          style={styles.formHeader}
        >
          <View style={styles.titleContainer}>
            <Animated.Text
              entering={LightSpeedInLeft.duration(1500)}
              exiting={LightSpeedInRight.duration(1500)}
              style={[TextStyles.title, {textAlign: "center", color: action1}]}
            >
              {translate("send_recover_code")}
            </Animated.Text>
            <Animated.Text
              entering={LightSpeedInLeft.duration(1500)}
              exiting={LightSpeedInRight.duration(1500)}
              style={[
                TextStyles.description,
                {textAlign: "center", color: text},
              ]}
            >
              {translate("send_recover_code_description")}
            </Animated.Text>
          </View>
        </Animated.View>
        <Animated.View
          entering={BounceInDown.duration(1000)}
          exiting={BounceInUp}
          style={styles.formContainer}
        >
          <View style={{flexDirection: "column"}}>
            <Controller
              name={"email"}
              control={control}
              render={({field}) => (
                <InputForm
                  icon={Icons.email}
                  label={translate("email")}
                  errorMessage={errors.email?.message}
                  field={field}
                  keyboardType={"email-address"}
                  placeholder={translate("email_placeholder")}
                />
              )}
            />
            <VerticalSeparator percent={5}/>
            <ButtonForm
              loading={loadingState}
              loadingLabel={translate("pending_send_recover_password_code")}
              label={translate("send_recover_password_code")}
              handleClick={handleSubmit(onSubmit)}
            />
            <View style={{flexDirection: 'row', width: wp(90), alignSelf: 'center', justifyContent: 'center', marginTop: hp(3)}}>
              <Text style={{color: text, fontWeight: '300', fontSize: FontSize.normal}}> {translate('already_received_recover_code')} ?</Text>
              <TouchableOpacity onPress={()=>{navigateByPath(routes.auth.recover_password)}}>
              <Text style={{color: action1, fontWeight: 'bold', fontSize: FontSize.normal}}> {translate('recover_password')} </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default sendRecoverPasswordCode;
