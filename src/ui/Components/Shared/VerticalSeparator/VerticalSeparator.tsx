import { View } from "react-native"
import { hp } from "../../../Global/Percentage"

type props = {
    percent: number
}
const VerticalSeparator = ({percent}: props) => {
    return <View style={{marginTop: hp(percent)}} />
}

export default VerticalSeparator;