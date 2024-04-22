import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

export const wp = (percentage: number) => widthPercentageToDP(`${percentage}%`);
export const hp = (percentage: number) => heightPercentageToDP(`${percentage}%`);
