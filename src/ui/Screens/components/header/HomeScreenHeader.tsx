import {Text, TouchableOpacity, View} from "react-native";
import {Theme} from "../../../Global/Theme";
import styles from "./HomeScreenHeader.style";
import Avatar from "../../../Components/Avatar/Avatar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Icons } from "../../../Global/Icons";
import { IconSizes } from "../../../Global/IconSizes";

type props = {
    userName: string
}
const HomeScreenHeader = ({userName}: props) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 9}}>
        <Avatar size={"small"} />
        <Text style={styles.username}>{userName}</Text>
      </View>
      <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}}>
        <Icon name={Icons.settings} size={IconSizes.normal} color={Theme.light} />
      </TouchableOpacity>
    </View>
  );
};
export default HomeScreenHeader;
