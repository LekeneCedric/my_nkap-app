import Animated from "react-native-reanimated";
import { TextInput } from "react-native";
import { FontSize } from "../../Global/FontSize";
import SearchInputStyle from "./SearchInput.style";
import useTheme from "../../Shared/Hooks/useTheme.ts";

type SearchInputProps = {
    value: string,
    onChange: (text: string) => void;
}
const SeachInput = ({value, onChange}: SearchInputProps) => {
    const {colorPalette: {pageBackground, containerBackground, text}} = useTheme();
    const styles = SearchInputStyle(pageBackground);
    return <Animated.View style={styles.container}>
        <TextInput
          keyboardType={'default'}
          placeholder={'Rechercher dans la liste'}
          placeholderTextColor={text}
          cursorColor={text}
          onChangeText={onChange}
          value={value}
          style={{color: text, textDecorationLine: "none", fontSize: FontSize.normal, width: '100%', height: '100%'}}
        />
    </Animated.View>
}
export default SeachInput;