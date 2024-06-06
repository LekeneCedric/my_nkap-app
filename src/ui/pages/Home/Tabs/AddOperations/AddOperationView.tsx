import {SafeAreaView, ScrollView, View} from "react-native";
import styles from "./AddOperationView.styles.ts";
import UseAddOperationView from "./useAddOperationView.ts";
import {Theme} from "../../../../Global/Theme.ts";
import Animated, {BounceInDown, BounceInUp} from "react-native-reanimated";
import AddOperationForm from "./Form/AddOperationForm.tsx";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../../Global/Icons.ts";
import {IconSizes} from "../../../../Global/IconSizes.ts";

const AddOperationView = () => {
    const {
        addOperationFormBehaviour,
        accounts,
        categories
    } = UseAddOperationView();
    return (
        <SafeAreaView style={[styles.pageContainer, {backgroundColor: Theme.light}]}>
            <ScrollView>
                <Animated.View entering={BounceInDown.duration(1000)} exiting={BounceInUp}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5}}>
                        <Animated.Text style={styles.title}>Nouvelle Opération </Animated.Text>
                        <Icon name={Icons.transactions} size={IconSizes.medium} color={Theme.primary}/>
                    </View>
                    <AddOperationForm categories={categories} accounts={accounts} addOperationFormBehaviour={addOperationFormBehaviour}/>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    )
};
export default AddOperationView;