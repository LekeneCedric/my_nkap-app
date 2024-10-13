import Animated from "react-native-reanimated";
import { TextInput } from "react-native";
import { FontSize } from "../../Global/FontSize";
import SearchInputStyle from "./SearchInput.style";
import useTheme from "../../Shared/Hooks/useTheme.ts";
import useCustomTranslation from "../../Shared/Hooks/useCustomTranslation.ts";

type SearchInputProps = {
    value: string,
    onChange: (text: string) => void;
    backgroundColor?: string
}
const SeachInput = ({value, onChange, backgroundColor}: SearchInputProps) => {
    const {translate} = useCustomTranslation();
    const {colorPalette: {pageBackground, containerBackground, text, gray}} = useTheme();
    const styles = SearchInputStyle(pageBackground);
    return <Animated.View style={[styles.container, {backgroundColor: backgroundColor ?? containerBackground}]}>
        <TextInput
          key={'text-id'}
          keyboardType={'default'}
          placeholder={translate('select_placeholder')}
          placeholderTextColor={gray}
          cursorColor={text}
          onChangeText={onChange}
          value={value}
          style={{color: text, textDecorationLine: "none", fontSize: FontSize.normal, width: '100%', height: '100%'}}
        />
    </Animated.View>
}
export default SeachInput;