import {Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../Global/Icons";
import {IconSizes} from "../../../Global/IconSizes";
import useCustomNavigation from "../../../utils/useNavigation";
import {routes} from "../../../pages/routes";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import HomeScreenHeaderStyle from "./HomeScreenHeader.style";
import useHomeScreenHeader from "./useHomeScreenHeader.ts";
import {FontSize} from "../../../Global/FontSize.ts";
import useConfiguration from "../../../Shared/Hooks/useConfiguration.ts";
import useMoneyParser from "../../../Shared/useMoneyParser.ts";

type props = {
    userName: string,
    props: any
}
const HomeScreenHeader = ({props}: props) => {
    const {
        totalBalance,
    } = useHomeScreenHeader();
    const {
        parseThousand
    } = useMoneyParser();
    const {
        switchCanSeeAmount,
        displayAmount
    } = useConfiguration();
    const {navigateByPath} = useCustomNavigation();
    const {colorPalette: {pageBackground, containerBackground, text, action1, action1Text, action1Container, light}} = useTheme();
    const styles = HomeScreenHeaderStyle(pageBackground, containerBackground, text);
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                navigateByPath(routes.home.settings.main)
            }} style={styles.iconContainer}>
                <Icon style={styles.icon} name={Icons.settings} size={IconSizes.normal} color={action1}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={switchCanSeeAmount} style={{backgroundColor: action1Container, padding: 5, borderRadius: 8}}>
                <Text numberOfLines={1} style={{fontSize: FontSize.medium, fontWeight: 'bold', color: action1}}>
                    {displayAmount(`XAF ${parseThousand(totalBalance)}`)}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconContainer, {backgroundColor: containerBackground, padding: 8}]}>
                <Icon name={Icons.user} size={IconSizes.normal} color={action1} />
            </TouchableOpacity>
        </View>
    );
};
export default HomeScreenHeader;
