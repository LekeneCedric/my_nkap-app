import {IOperationTypeEnum} from "../../../../Domain/Operation/Operation.ts";
import Animated, {BounceInDown, BounceInUp} from "react-native-reanimated";
import {Modal, ScrollView, Text, TouchableOpacity, View} from "react-native";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import SelectOperationTypeModalStyles from "./SelectOperationTypeModal.styles.ts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../Global/Icons.ts";
import {IconSizes} from "../../../Global/IconSizes.ts";
import {FontSize} from "../../../Global/FontSize.ts";

type props = {
    action: (operationType: IOperationTypeEnum) => void,
    closeModal: () => void,
    isVisible: boolean,
    selectedOperationTypeValue?: IOperationTypeEnum,
}
const SelectOperationTypeModalView = ({action, closeModal, isVisible, selectedOperationTypeValue}: props) => {
    const data = [
        {
            label: 'Dépenses',
            value: IOperationTypeEnum.EXPENSE,
        },
        {
            label: 'Revenus',
            value: IOperationTypeEnum.INCOME,
        }
    ]
    const {colorPalette: {pageBackground, containerBackground, action1, text }} = useTheme();
    const styles = SelectOperationTypeModalStyles(pageBackground, containerBackground, text, action1);
    return (
        <Modal transparent={true} style={styles.modalContainer} animationType={'slide'} visible={isVisible}>
            <Animated.View entering={BounceInDown.duration(1000)} exiting={BounceInUp.duration(1000)}
                           style={styles.container}>
                <View style={{width: '100%', alignItems: 'center', paddingRight: 10, flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{color: text, fontSize: FontSize.normal, fontWeight: 'bold', textAlign: 'center'}}>Type d'opération</Text>
                    <TouchableOpacity style={{alignSelf: 'flex-end', position: 'absolute', right: 10}} onPress={()=>{closeModal()}}>
                        <Icon color={text}  name={Icons.close} size={IconSizes.normal} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={{padding: 20}}>
                    {
                        data.map( item => {
                            const itemIsSelected = selectedOperationTypeValue == item.value;
                            return <TouchableOpacity onPress={()=>{action(item.value)}} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                <Icon
                                    name={ itemIsSelected ? Icons.circle.checked : Icons.circle.unChecked}
                                    size={IconSizes.normal}
                                    color={itemIsSelected ? action1 : text}
                                />
                                <Text style={{marginLeft: 10, color: text, fontSize: FontSize.medium}}>
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        })
                    }
                </ScrollView>
            </Animated.View>
        </Modal>
    );
};
export default SelectOperationTypeModalView;