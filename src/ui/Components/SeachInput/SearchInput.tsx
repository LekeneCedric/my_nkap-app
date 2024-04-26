import Animated from "react-native-reanimated";
import styles from './SearchInput.style';
import { TextInput } from "react-native";
import { Theme } from "../../Global/Theme";
import { FontSize } from "../../Global/FontSize";

type SearchInputProps = {
    onChange: (text: string) => void;
}
const SeachInput = ({onChange}: SearchInputProps) => {
    return <Animated.View style={styles.container}>
        <TextInput
          keyboardType={'default'}
          placeholder={'Rechercher dans la liste'}
          placeholderTextColor={Theme.gray}
          cursorColor={Theme.primary}
          onChangeText={onChange}
          style={{color: Theme.dark, textDecorationLine: "none", fontSize: FontSize.normal}}
        />
    </Animated.View>
}
export default SeachInput;