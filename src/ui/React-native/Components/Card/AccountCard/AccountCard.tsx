import { Text, TouchableOpacity, View } from "react-native";
import Animated, { BounceInLeft } from "react-native-reanimated";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import AccountCardStyle from "./AccountCard.style";

type props = {
    name: string;
    amount: number;
    type: string;
}
const AccountCard = ({name, amount, type}: props) => {
    const {colorPalette: {pageBackground, containerBackground, text, gray, action1, action1Text}} = useTheme();
    const styles = AccountCardStyle(pageBackground, containerBackground, text, gray, action1, action1Text);
    return (
        <Animated.View entering={BounceInLeft.duration(1500)} style={styles.container}>
            <Text numberOfLines={1} style={styles.title}>{type}</Text>
            <Text numberOfLines={1} style={styles.amount}>XAF {amount}</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Détails</Text>
            </TouchableOpacity>
        </Animated.View>
    )
};
export default AccountCard;