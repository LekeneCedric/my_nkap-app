import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import Animated, { BounceIn, BounceInDown, BounceInUp, BounceOut } from "react-native-reanimated";
import styles from './SelectModalView.style';
import SeachInput from "../../../SeachInput/SearchInput";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Icons } from "../../../../Global/Icons";
import { IconSizes } from "../../../../Global/IconSizes";
import { Theme } from "../../../../Global/Theme";
import { useSelectModalView } from "./useSelectModalView";

type selectModalViewProps = {
    action: (id: string, name: string) => void,
    closeModal: () => void,
    isVisible: boolean,
    list: any[]
}

const SelectModalView = ({
    action, closeModal, isVisible, list
}: selectModalViewProps) => {
    const {filterList, sortList} = useSelectModalView(list);
    return (
        <Modal transparent={true} style={styles.modalContainer} animationType={'slide'} visible={isVisible}>
            <Animated.View entering={BounceInDown.duration(1000)} exiting={BounceInUp.duration(1000)} style={styles.container}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={closeModal} style={{flex: 1, alignItems: 'center'}}>
                        <Icon name={Icons.back} size={IconSizes.normal} color={Theme.primary}/>
                    </TouchableOpacity>
                    <SeachInput onChange={(text: string) => {sortList(text)}} />
                    <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
                        <Icon name={Icons.close} size={IconSizes.normal} color={Theme.primary}/>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={filterList}
                    renderItem={({item}) => <TouchableOpacity onPress={()=>{action(item.id, item.name)}} style={styles.itemContainer}>
                        <Text style={styles.itemText}>{item.name}</Text>
                    </TouchableOpacity>}
                    keyExtractor={item => item.id}
                    style={styles.listContainer}
                />
            </Animated.View>
        </Modal>
    );
}
export default SelectModalView;