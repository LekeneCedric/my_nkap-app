import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "./AddOperationView.styles.ts";
import UseAddOperationView from "./useAddOperationView.ts";
import Animated, {BounceInDown, BounceInUp} from "react-native-reanimated";
import AddOperationForm from "./Form/AddOperationForm.tsx";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../Global/Icons.ts";
import {IconSizes} from "../../../Global/IconSizes.ts";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import useNavigation from "../../../utils/useNavigation.ts";
import useCustomTranslation from "../../../Shared/Hooks/useCustomTranslation.ts";

const AddOperationView = () => {
    const {translate} = useCustomTranslation();
    const {
        addOperationFormBehaviour,
        accounts,
        categories
    } = UseAddOperationView();
    const {goBack} = useNavigation();
    const {colorPalette: {pageBackground, containerBackground, text, action1}} = useTheme();
    return (
        <SafeAreaView style={[styles.pageContainer, {backgroundColor: pageBackground}]}>

            <Animated.View entering={BounceInDown.duration(1000)} exiting={BounceInUp}>
                <View style={[styles.headerContainer, {backgroundColor: pageBackground, alignItems: 'center'}]}>
                    <TouchableOpacity style={{position: 'absolute', left: 15}} onPress={goBack}>
                        <Icon
                            name={Icons.back}
                            size={IconSizes.medium}
                            color={text}
                        />
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Animated.Text style={[styles.title, {color: text}]}>{translate('new_operation')}</Animated.Text>
                        <Icon name={Icons.transactions} size={IconSizes.medium} color={action1}/>
                    </View>
                </View>

                <ScrollView>
                    <AddOperationForm categories={categories} accounts={accounts}
                                      addOperationFormBehaviour={addOperationFormBehaviour}/>
                </ScrollView>

            </Animated.View>
        </SafeAreaView>
    )
};
export default AddOperationView;