import { Text, TouchableOpacity, View } from "react-native";
import styles from "./AccountCard.style";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IconSizes } from "../../../Global/IconSizes";
import { Icons } from "../../../Global/Icons";
import { Theme } from "../../../Global/Theme";
import Animated, { BounceInLeft } from "react-native-reanimated";
import { useEffect } from "react";

type props = {
    name: string;
    amount: number;
    type: string;
}
const AccountCard = ({name, amount, type}: props) => {
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