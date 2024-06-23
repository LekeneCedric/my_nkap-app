import { StyleSheet } from "react-native";
import { Theme } from "../Theme.ts";
import { widthPercentageToDP } from "react-native-responsive-screen";
import {hp} from "../Percentage.ts";

export const PageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.light,
    flexDirection: 'column',
    position: 'relative',
    paddingTop: 5
  }
})
