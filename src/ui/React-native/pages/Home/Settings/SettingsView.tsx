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
import { FontSize } from "../../../Global/FontSize.ts";

const SettingsView = () => {
  const {translate} = useCustomTranslation();
  const {
    menuItems,
    linkToMyGithubProfile
  } = useSettingsView();
  const {goBack} = useCustomNavigation();
  const {colorPalette: {pageBackground, text, action1}}= useTheme();
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
      <View 
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          bottom: 80
        }}>
        <Text 
          style={{
            color: text,
            fontSize: FontSize.normal,
            fontWeight: '300'
          }}>Powered by</Text>
        <TouchableOpacity onPress={linkToMyGithubProfile}>
          <Text 
            style={{
              marginLeft: 5,
              color: action1,
              fontSize: FontSize.normal,
              fontWeight: 'bold'
            }}>@Lekene Cedric</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default SettingsView;
