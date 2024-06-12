import {IMenu} from "../../useSettingsView.ts";
import MenuViewStyles from "./MenuView.styles.ts";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {IconSizes} from "../../../../../Global/IconSizes.ts";
import useTheme from "../../../../../Shared/Hooks/useTheme.ts";
import useNavigation from "../../../../../utils/useNavigation.ts";

type props = {
    menus: IMenu[]
}
const MenuView = ({menus}: props) => {
    const {colorPalette: {pageBackground, containerBackground, action1, text, gray}} = useTheme();
    const styles = MenuViewStyles(text, gray);
    const {navigateByPath} = useNavigation();
    return <View>
        <ScrollView>
            {
                menus.map(menu => {
                    return <View style={[styles.sectionContainer, menu.end == true ? {borderBottomWidth: 0}: {}]}>
                        <Text style={styles.sectionTitle}>{menu.title}</Text>
                        {
                            menu.section.map(section => {
                                return <TouchableOpacity onPress={()=>{navigateByPath(section.route)}} style={styles.itemContainer}>
                                    <Icon style={styles.icon} name={section.icon} size={IconSizes.normal} color={section.color} />
                                    <Text style={styles.itemText}>{section.title}</Text>
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