import {Text, TouchableOpacity, View} from "react-native";
import {Theme} from "../../../Global/Theme";
import styles from "./HomeScreenHeader.style";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Icons } from "../../../Global/Icons";
import { IconSizes } from "../../../Global/IconSizes";
import { useEffect } from "react";
import useCustomNavigation from "../../../utils/useNavigation";
import { routes } from "../../../pages/routes";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import HomeScreenHeaderStyle from "./HomeScreenHeader.style";

type props = {
    userName: string,
    props: any
}
const HomeScreenHeader = ({props}: props) => {

  const {navigateByPath} = useCustomNavigation();
  const {colorPalette: {pageBackground, containerBackground, text, action1}} = useTheme();
  const styles = HomeScreenHeaderStyle(pageBackground, containerBackground, text);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>{navigateByPath(routes.home.settings)}} style={styles.iconContainer}>
          <Icon style={styles.icon} name={Icons.settings} size={IconSizes.normal} color={action1} />
      </TouchableOpacity>
      {/*<Text style={styles.title}>{props.route.name}</Text>*/}
      <TouchableOpacity style={styles.iconContainer}>
          <Icon style={styles.icon} name={Icons.user} size={IconSizes.normal} color={action1}/>
      </TouchableOpacity>
    </View>
  );
};
export default HomeScreenHeader;
