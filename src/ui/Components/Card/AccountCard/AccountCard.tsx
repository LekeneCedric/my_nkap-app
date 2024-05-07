import { Text, TouchableOpacity, View } from "react-native";
import styles from "./AccountCard.style";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IconSizes } from "../../../Global/IconSizes";
import { Icons } from "../../../Global/Icons";
import { Theme } from "../../../Global/Theme";
import Animated, { BounceInLeft } from "react-native-reanimated";

const AccountCard = () => {
    return (
        <Animated.View entering={BounceInLeft.duration(1500)} style={styles.container}>
            <Text numberOfLines={1} style={styles.title}>Credit Account</Text>
            <Text numberOfLines={1} style={styles.amount}>XAF 100.000</Text>
            <View style={styles.statsContainer}>
                <Text style={styles.statDesc}> Cette semaine </Text>
                <View style={styles.statView}>
                    <Text style={styles.statViewText}>10.8%</Text>
                    <View style={styles.statViewIconContainer}>
                        <Icon style={styles.stateViewIcon} size={IconSizes.small} name={Icons.stats.up} color={Theme.dark} />
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Account Details</Text>
            </TouchableOpacity>
        </Animated.View>
    )
};
export default AccountCard;