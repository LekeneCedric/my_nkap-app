import { StyleSheet } from "react-native";
import { Theme } from "../../../Global/Theme";
import { hp, wp } from "../../../Global/Percentage";
import { FontSize } from "../../../Global/FontSize";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
      },
      inputLabel: {
        color: Theme.dark,
        width: wp(90),
        alignSelf: 'center',
        fontSize: FontSize.normal
      },
      inputContainer: {
        width: wp(90),
        padding: wp(1),
        height: hp(6),
        backgroundColor: Theme.primaryLight,
        borderRadius: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center'
      },
      info: {
        width: wp(90),
        alignSelf: 'center',
        fontSize: FontSize.normal
      },
      birthdate: {
        color: Theme.dark,
        marginLeft: wp(1),
        fontSize: FontSize.normal,
        fontWeight: '500'
      },
      placeholder: {
        color: Theme.gray,
        marginLeft: wp(1),
        fontSize: FontSize.normal,
        fontWeight: '500'
      }
});
export default styles;