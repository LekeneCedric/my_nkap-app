import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {hp, wp} from "../../../../Global/Percentage.ts";
import useTheme from "../../../../Shared/Hooks/useTheme.ts";

const LoadingAccount = () => {
    const {colorPalette: {containerBackground}} = useTheme();
    return (
        <SkeletonPlaceholder borderRadius={4} backgroundColor={containerBackground}>
            <SkeletonPlaceholder.Item backgroundColor={containerBackground} flexDirection="row" alignItems="center">
                <SkeletonPlaceholder.Item backgroundColor={containerBackground} width={wp(45)} height={hp(20)} borderRadius={5} />
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    );
};
export default LoadingAccount;