import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../Global/Icons";
import {IconSizes} from "../../../Global/IconSizes";
import {Theme} from "../../../Global/Theme";
import useSettingsView from "./useSettingsView";
import useCustomNavigation from "../../../utils/useNavigation";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import SettingsViewStyles from "./SettingsView.style";

const SettingsView = () => {
  const {menuItems} = useSettingsView();
  const {goBack} = useCustomNavigation();
  const {colorPalette: {pageBackground, containerBackground, text, gray, action1}}= useTheme();
  const styles = SettingsViewStyles(pageBackground, containerBackground, text, gray, action1);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBack}>
          <Icon
            name={Icons.back}
            size={IconSizes.medium}
            color={Theme.primary}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paramètres</Text>
      </View>
      <View>
        <ScrollView>
          <Menu items={menuItems}/>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default SettingsView;
