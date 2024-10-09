import { ActivityIndicator, NativeSyntheticEvent, SafeAreaView, Text, TextInput, TextInputKeyPressEventData, View } from "react-native";
import useActivateAccount from "./useActivateAccount";
import ActivateAccountStyles from "./ActivateAccount.styles";
import useTheme from "../../../Shared/Hooks/useTheme";
import { LoadingState } from "../../../../../Domain/Enums/LoadingState";
import { IconSizes } from "../../../Global/IconSizes";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Icons } from "../../../Global/Icons";
import useCustomTranslation from "../../../Shared/Hooks/useCustomTranslation";

const ActivateAccount = () => {
    const {
        inputRefs,
        updateCode,
        code,
        backToPreviousInput,
        handleFocus,
        loadingState,
        failed,
        success,
        pending,
        formattedLeftTime,
        email
    } = useActivateAccount();
    const {translate} = useCustomTranslation();
    const {colorPalette: {pageBackground, text, gray, containerBackground, action1, green, red}} = useTheme();
    const styles = ActivateAccountStyles({
        backgroundColor: pageBackground,
        textColor: text,
        descriptionColor: gray,
        containerBackgroundColor: containerBackground
    });
    return <SafeAreaView style={styles.pageContainer}>
            <View style={styles.centerView}>
                <View>
                    {
                        pending && (
                            <ActivityIndicator
                                size={IconSizes.medium}
                                color={action1}
                            />
                        )
                    }
                    {
                        failed && (
                            <Icon
                                name={Icons.circle.alert}
                                size={IconSizes.medium}
                                color={red}
                            />
                        )
                    }
                    {
                        success && (
                            <Icon
                                name={Icons.circle.checked}
                                size={IconSizes.medium}
                                color={green}
                            />
                        )
                    }
                </View>
                <View>
                    <Text style={styles.hour}>{formattedLeftTime}</Text>
                </View>
                <View style={[styles.centerView, styles.padding]}>
                    <Text style={styles.description}>
                        {translate('verif_account_part1')+ email + translate('verif_account_part2')}
                    </Text>
                </View>
                <View style={[styles.centerView, styles.horizontalAlignment]}>
                    {
                        code.map( (code: string, i: number) => {
                            return (
                                <TextInput
                                    editable = {
                                        loadingState !== (LoadingState.pending && LoadingState.success)
                                    }
                                    cursorColor={text}
                                    onFocus={() => {handleFocus(i)}}
                                    onChangeText={(text) => {updateCode(text, i)}}
                                    onKeyPress={(e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
                                        if (e.nativeEvent.key == 'Backspace' && code.length == 0){
                                            backToPreviousInput(i);
                                        }
                                    }}
                                    keyboardType="number-pad"
                                    ref={inputRefs[i]}
                                    style={[styles.textInput, {
                                        borderColor: success ? green : failed ? red : pageBackground
                                    }]}
                                    value={code}
                                />
                            )
                        })
                    }
                     </View>
            </View>
        </SafeAreaView>
};

export default ActivateAccount;