import { Image, View } from "react-native"
import styles from "./Avatar.style";

type props = {
    size: 'small' | 'middle' | 'large',
}
const Avatar = ({size}: props) => {
    const getSizes = (): {height: number, width: number} => {
        switch (size) {
            case "small":
                return {height: 80, width: 10}
            default:
                return {height: 80, width: 10}
        }
    }
    return <Image 
    source={require('../../../assets/icons/Home/header/user.png')}
    style={[styles.container, {width: `${getSizes().width}%`, height: `${getSizes().height}%`}]}
    />
}
export default Avatar;