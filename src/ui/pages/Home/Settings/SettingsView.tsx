import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./SettingsView.style";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../Global/Icons";
import {IconSizes} from "../../../Global/IconSizes";
import {Theme} from "../../../Global/Theme";
import useSettingsView from "./useSettingsView";
import useCustomNavigation from "../../../utils/useNavigation";

const SettingsView = () => {
  const {logout} = useSettingsView();
  const {goBack} = useCustomNavigation();
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
          <View style={styles.menuItem}>
            <Text style={styles.menuItemTitle}>Appareil</Text>
            <TouchableOpacity onPress={logout} style={styles.itemContainer}>
              <Text style={[styles.itemText, {color: Theme.red}]}>
                Deconnexion
              </Text>
              <Icon
                name={Icons.logout}
                color={Theme.red}
                size={IconSizes.medium}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default SettingsView;
