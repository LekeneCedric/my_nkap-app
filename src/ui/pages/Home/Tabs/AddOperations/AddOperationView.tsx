import {SafeAreaView, ScrollView, View} from "react-native";
import styles from "./AddOperationView.styles.ts";
import UseAddOperationView from "./useAddOperationView.ts";
import {Theme} from "../../../../Global/Theme.ts";
import Animated, {BounceInDown, BounceInUp} from "react-native-reanimated";
import AddOperationForm from "./Form/AddOperationForm.tsx";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../../Global/Icons.ts";
import {IconSizes} from "../../../../Global/IconSizes.ts";
import useTheme from "../../../../Shared/Hooks/useTheme.ts";

const AddOperationView = () => {
    const {
        addOperationFormBehaviour,
        accounts,
        categories
    } = UseAddOperationView();
    const {colorPalette: {pageBackground, containerBackground, text, action1}} = useTheme();
    return (
        <SafeAreaView style={[styles.pageContainer, {backgroundColor: pageBackground}]}>

            <Animated.View entering={BounceInDown.duration(1000)} exiting={BounceInUp}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5}}>
                    <Animated.Text style={[styles.title, {color: text}]}>Nouvelle Opération </Animated.Text>
                    <Icon name={Icons.transactions} size={IconSizes.medium} color={action1}/>
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