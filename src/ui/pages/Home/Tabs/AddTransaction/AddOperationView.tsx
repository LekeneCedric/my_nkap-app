import {SafeAreaView, ScrollView} from "react-native";
import styles from "./AddOperationView.styles.ts";
import UseAddOperationView from "./useAddOperationView.ts";
import {Theme} from "../../../../Global/Theme.ts";
import Animated, {BounceInDown, BounceInUp} from "react-native-reanimated";
import AddOperationForm from "./Form/AddOperationForm.tsx";

const AddOperationView = () => {
    const {
        addOperationFormBehaviour,
        accounts,
    } = UseAddOperationView();
    return (
        <SafeAreaView style={[styles.pageContainer, {backgroundColor: Theme.light}]}>
            <ScrollView>
                <Animated.View entering={BounceInDown.duration(1000)} exiting={BounceInUp}>
                    <AddOperationForm accounts={accounts} addOperationFormBehaviour={addOperationFormBehaviour}/>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    )
};
export default AddOperationView;