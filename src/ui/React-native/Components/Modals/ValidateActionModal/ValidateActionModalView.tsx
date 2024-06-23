import {Modal, Text, TouchableOpacity, View} from "react-native";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import ValidateActionModalViewStyles from "./ValidateActionModalView.styles.ts";
import Animated, {BounceInDown, BounceInUp} from "react-native-reanimated";
import ButtonForm from "../../Forms/Button/ButtonForm.tsx";
import {LoadingState} from "../../../../../Domain/Enums/LoadingState.ts";
import {FontSize} from "../../../Global/FontSize.ts";

type props = {
    title: string,
    description: string,
    action: () => void,
    close: () => void,
    isVisible: boolean,
}
const ValidateActionModalView = ({title, description, action, close, isVisible}: props) => {
    const {colorPalette: {pageBackground, containerBackground, action1, text, red, gray}} = useTheme();
    const styles = ValidateActionModalViewStyles(pageBackground, containerBackground, text, action1, red);
    return <Modal transparent={true} style={styles.modalContainer} animationType={'slide'} visible={isVisible}>
        <Animated.View entering={BounceInDown.duration(1000)} exiting={BounceInUp.duration(1000)}
                       style={styles.container}>
            <View style={{flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
                <Text numberOfLines={1} style={{fontSize: FontSize.medium, color: text, fontWeight: 'bold', marginLeft: 10}}>{title}</Text>
                <Text style={{fontSize: FontSize.normal, fontWeight: '100', color: text, marginLeft: 10}}>{description}</Text>
                <View style={{flexDirection: 'column', justifyContent: 'space-evenly', marginBottom: 10}}>
                    <ButtonForm noAnimation={true} color={red} loading={LoadingState.success} loadingLabel={'Enregistrement ...'}
                                label={'Enregistrer'}
                                handleClick={action}/>
                    <View style={{width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 15, marginBottom: 15}}>
                        <TouchableOpacity onPress={close}>
                            <Text style={{
                                fontSize: FontSize.normal,
                                color: gray,
                                fontWeight: 'bold',
                                borderBottomWidth: 1,
                                borderBottomColor: gray
                            }}>
                                Annuler
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Animated.View>
    </Modal>
};
export default ValidateActionModalView;