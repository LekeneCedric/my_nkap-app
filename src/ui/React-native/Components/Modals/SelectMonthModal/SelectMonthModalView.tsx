import Months, {MonthItem} from "../../../../../Domain/Shared/Months.ts";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import SelectOperationTypeModalStyles from "../SelectTypeModal/SelectOperationTypeModal.styles.ts";
import {Modal, ScrollView, Text, TouchableOpacity, View} from "react-native";
import Animated, {BounceInDown, BounceInUp} from "react-native-reanimated";
import {FontSize} from "../../../Global/FontSize.ts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../Global/Icons.ts";
import {IconSizes} from "../../../Global/IconSizes.ts";
import SelectMonthModalStyles from "./SelectMonthModalView.styles.ts";

type props = {
    action: (item: MonthItem) => void,
    closeModal: () => void,
    isVisible: boolean,
    selectedMonth?: number
}
const SelectMonthModalView = ({action, closeModal, selectedMonth, isVisible}: props) => {
    const {colorPalette: {pageBackground, containerBackground, action1, text}} = useTheme();
    const styles = SelectMonthModalStyles(pageBackground, containerBackground, text, action1);

    return (
        <Modal transparent={true} style={styles.modalContainer} animationType={'slide'} visible={isVisible}>
            <Animated.View entering={BounceInDown.duration(1000)} exiting={BounceInUp.duration(1000)}
                           style={styles.container}>
                <View style={{
                    width: '100%',
                    alignItems: 'center',
                    paddingRight: 10,
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        color: text,
                        fontSize: FontSize.normal,
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>Mois</Text>
                    <TouchableOpacity style={{alignSelf: 'flex-end', position: 'absolute', right: 10}} onPress={() => {
                        closeModal()
                    }}>
                        <Icon color={text} name={Icons.close} size={IconSizes.normal}/>
                    </TouchableOpacity>
                </View>

                <ScrollView style={{padding: 20}}>
                    {
                        Object.keys(Months).map(key => {
                            const item = Months[key];
                            return <TouchableOpacity onPress={() => {
                                action(item)
                            }} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                <Icon
                                    name={selectedMonth == item.value ? Icons.circle.checked : Icons.circle.unChecked}
                                    size={IconSizes.normal}
                                    color={selectedMonth == item.value ? action1 : text}
                                />
                                <Text style={{color: text, fontSize: FontSize.medium}}>
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        })
                    }
                </ScrollView>
            </Animated.View>
        </Modal>
    )
};
export default SelectMonthModalView;