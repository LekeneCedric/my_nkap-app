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
import MenuView from "./Components/Menu/MenuView.tsx";
import useCustomTranslation from "../../../Shared/Hooks/useCustomTranslation.ts";

const SettingsView = () => {
  const {translate} = useCustomTranslation();
  const {menuItems} = useSettingsView();
  const {goBack} = useCustomNavigation();
  const {colorPalette: {pageBackground, containerBackground, text}}= useTheme();
  const styles= SettingsViewStyles(pageBackground, text);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBack}>
          <Icon
            name={Icons.back}
            size={IconSizes.medium}
            color={text}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{translate('settings')}</Text>
      </View>
      <View style={{padding: 10}}>
        <ScrollView>
          <MenuView menus={menuItems}/>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default SettingsView;
