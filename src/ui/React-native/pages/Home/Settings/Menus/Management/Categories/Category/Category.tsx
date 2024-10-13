import Animated, { BounceInLeft, BounceOutLeft } from "react-native-reanimated";
import ICategory from "../../../../../../../../../Domain/Category/Category";
import { Swipeable } from "react-native-gesture-handler";
import { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Icons } from "../../../../../../../Global/Icons";
import { IconSizes } from "../../../../../../../Global/IconSizes";
import useTheme from "../../../../../../../Shared/Hooks/useTheme";
import AddCategoryModal from "../../../../../../../Components/Forms/SelectCategory/SelectCategoryModal/AddCategoryModal/AddCategoryModal";
import useCategory from "./useCategory";
import ValidateActionModalView from "../../../../../../../Components/Modals/ValidateActionModal/ValidateActionModalView";
import useCustomTranslation from "../../../../../../../Shared/Hooks/useCustomTranslation";

type props = {
    data: ICategory,
}
const Category = ({data}: props) => {
    const swipeRef = useRef<Swipeable | null>(null);
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
    const {colorPalette: {containerBackground, action1, red, text}} = useTheme();

    const closeModal = () => {setShowUpdateModal(false);}
    const showingUpdateModal = () => {setShowUpdateModal(true);}

    const {loading, form, onSubmit} = useCategory(data, closeModal);

    return <Animated.View entering={BounceInLeft.duration(1000)} exiting={BounceOutLeft.duration(100)}>
        <AddCategoryModal
            form={form}
            loading={loading}
            onClose={closeModal}
            onSubmit={onSubmit}
            isVisible={showUpdateModal}
            data={data}
        />
            <TouchableOpacity
                onPress={showingUpdateModal}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 4,
                    marginTop: 5,
                    backgroundColor: containerBackground,
                    shadowColor: "#171717",
                    shadowOffset: {width: 5, height: 5},
                    shadowOpacity: 0.2,
                    shadowRadius: 5,
                    elevation: 5,
                    borderRadius: 5,
                    padding: 3,
                  }}
            >
                <View
                    style={{
                        width: '5%',
                        height: "100%",
                        borderBottomLeftRadius: 5,
                        borderTopLeftRadius: 5,
                        backgroundColor: data.color
                    }}
                />
                <View style={{width: '95%', flexDirection: 'row', alignItems: 'center', padding: 3}}>
                    <Icon name={data.icon} color={data.color} size={IconSizes.normal} />
                    <Text numberOfLines={1} style={{color: text, paddingLeft: 10}}>{data.name}</Text>
                </View>
            </TouchableOpacity>
    </Animated.View>
};

export default Category;