import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {hp, wp} from "../../../../Global/Percentage.ts";
import {View} from "react-native";

const LoadingAccount = () => {
    return (
        <SkeletonPlaceholder borderRadius={4}>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                <SkeletonPlaceholder.Item width={wp(45)} height={hp(20)} borderRadius={5} />
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    );
};
export default LoadingAccount;