import {FlatList, Modal, Text, TouchableOpacity, View} from "react-native";
import Animated, { BounceInDown, BounceInUp, BounceOut} from "react-native-reanimated";
import SeachInput from "../../../SeachInput/SearchInput";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../../Global/Icons";
import {IconSizes} from "../../../../Global/IconSizes";
import {useSelectModalView} from "./useSelectModalView";
import {useState} from "react";
import ISelectItem from "../SelectItem.ts";
import useTheme from "../../../../Shared/Hooks/useTheme.ts";
import SelectModalViewStyle from "./SelectModalView.style";
import {FontSize} from "../../../../Global/FontSize.ts";
import {hp} from "../../../../Global/Percentage.ts";

type selectModalViewProps = {
    action: (item: ISelectItem) => void,
    closeModal: () => void,
    isVisible: boolean,
    list: any[],
    notFoundMessage?: string,
    notFoundLinkName?: string,
    notFoundLinkAction?: () => void,
}

const SelectModalView = ({
    action, closeModal, isVisible, list, notFoundMessage, notFoundLinkName, notFoundLinkAction
}: selectModalViewProps) => {
    const {
        inputSearch,
        setInputSearch,
        filterList,
        sortList,
        clearSearch,
    } = useSelectModalView(list, closeModal);

    
    const {colorPalette: {pageBackground, containerBackground, text, gray, action1}} = useTheme();
    const styles = SelectModalViewStyle(pageBackground, containerBackground, text, gray);
    return (
        <Modal
            transparent={true}
            style={styles.modalContainer}
            animationType={'slide'}
            visible={isVisible}
        >
            <Animated.View entering={BounceInDown.duration(1000)} exiting={BounceInUp.duration(1000)}
                           style={styles.container}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 5}}>
                    <TouchableOpacity onPress={closeModal} style={{flex: 1, alignItems: 'center'}}>
                        <Icon name={Icons.back} size={IconSizes.normal} color={text}/>
                    </TouchableOpacity>
                    <SeachInput value={inputSearch} onChange={(text: string) => {
                        setInputSearch(text);
                        sortList(text)
                    }}/>
                    <TouchableOpacity onPress={()=>{clearSearch(true)}} style={{flex: 1, alignItems: 'center'}}>
                        <Icon name={Icons.close} size={IconSizes.normal} color={text}/>
                    </TouchableOpacity>
                </View>
                {
                    filterList.length > 0 && <FlatList
                        data={filterList}
                        renderItem={({item}) =>
                            <TouchableOpacity onPress={() => {
                                action(item)
                            }} style={styles.itemContainer}>
                                {
                                    item.icon && (
                                        <Icon name={item.icon} size={IconSizes.normal} color={item.color}/>
                                    )
                                }
                                <Text style={styles.itemText}>{item.name}</Text>
                            </TouchableOpacity>}
                        keyExtractor={item => item.id}
                        style={styles.listContainer}
                    />
                }
                {
                    filterList.length === 0 && (
                        <View style={{alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: hp(10)}}>
                            <Text style={{fontSize: FontSize.normal, color: text}}>
                                {notFoundMessage ? notFoundMessage : 'Aucun élément trouvé !' }
                            </Text>
                            {
                                notFoundLinkName && notFoundLinkAction && (
                                    <TouchableOpacity style={{marginTop: 15, borderBottomWidth: 1, borderBottomColor: action1}}>
                                        <Text style={{fontSize: FontSize.normal, color: action1}} onPress={()=>{
                                            notFoundLinkAction();
                                            closeModal();
                                        }}>
                                            {notFoundLinkName}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    )
                }

            </Animated.View>
        </Modal>
    );
}
export default SelectModalView;