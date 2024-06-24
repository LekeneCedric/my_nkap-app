import {IMenu} from "../../useSettingsView.ts";
import MenuViewStyles from "./MenuView.styles.ts";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {IconSizes} from "../../../../../Global/IconSizes.ts";
import useTheme from "../../../../../Shared/Hooks/useTheme.ts";
import useNavigation from "../../../../../utils/useNavigation.ts";
import {act} from "react-test-renderer";

type props = {
    menus: IMenu[]
}
const MenuView = ({menus}: props) => {
    const {colorPalette: {text, gray}} = useTheme();
    const styles = MenuViewStyles(text, gray);
    const {navigateByPath} = useNavigation();
    const action = (route?: string, action?: ()=>void) => {
        if (route) {
            navigateByPath(route);
            return;
        }
        if (action) {
            action();
        }
    }
    return <View>
        <ScrollView>
            {
                menus.map(menu => {
                    return <View style={[styles.sectionContainer, menu.end == true ? {borderBottomWidth: 0}: {}]}>
                        <Text style={styles.sectionTitle}>{menu.title}</Text>
                        {
                            menu.section.map(section => {
                                return <TouchableOpacity onPress={() => {action(section.route, section.action)}} style={styles.itemContainer}>
                                    <Icon style={styles.icon} name={section.icon} size={IconSizes.normal} color={section.iconColor} />
                                    <Text style={[styles.itemText, {color: section.color}]}>{section.title}</Text>
                                </TouchableOpacity>
                            })
                        }
                    </View>
                })
            }
        </ScrollView>
    </View>
};
export default MenuView;