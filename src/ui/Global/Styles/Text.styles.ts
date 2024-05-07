import { StyleSheet } from "react-native";
import { FontSize } from "../FontSize.ts";
import { Theme } from "../Theme.ts";

const TextStyles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: FontSize.high
  },
  description: {
    fontWeight: '300',
    fontSize: FontSize.medium
  }
});
export default TextStyles;
