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

type props = {
    data: ICategory,
}
const Category = ({data}: props) => {
    const closeModal = () => {
        setShowUpdateModal(false);
    }
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
    const {colorPalette: {containerBackground, action1, red, text}} = useTheme();
    const swipeRef = useRef<Swipeable | null>(null);
    const renderedActions = () => {
        return <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity onPress={()=>{setShowUpdateModal(true)}} style={{width: 50, alignItems: 'center'}}>
                        <Icon name={Icons.edit} size={IconSizes.normal} color={action1} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{}} style={{width: 50, alignItems: 'center'}}>
                        <Icon name={Icons.trash} size={IconSizes.normal} color={red} />
                    </TouchableOpacity>
                </View>
    }
    const cancelSwipe = () => {
        if (swipeRef.current) {
            swipeRef.current.close();
        }
    }
    const onPressSimulateSwipe= () => {
        if (swipeRef.current) {
          swipeRef.current.openRight();
        }
    }
    const {loading, form, onSubmit} = useCategory(data, closeModal, cancelSwipe);

    return <Animated.View entering={BounceInLeft.duration(1000)} exiting={BounceOutLeft.duration(100)}>
        <>
        <AddCategoryModal
            form={form}
            loading={loading}
            onClose={closeModal}
            onSubmit={onSubmit}
            isVisible={showUpdateModal}
            data={data}
        />
        <Swipeable
            ref={swipeRef}
            renderRightActions={() => renderedActions()}>
            <TouchableOpacity
                onPress={onPressSimulateSwipe}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 15,
                    backgroundColor: containerBackground,
                    shadowColor: "#171717",
                    shadowOffset: {width: 5, height: 5},
                    shadowOpacity: 0.2,
                    shadowRadius: 20,
                    elevation: 10,
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
        </Swipeable>
        </>
    </Animated.View>
};

export default Category;