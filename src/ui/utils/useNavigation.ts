import { useNavigation } from "@react-navigation/native";

interface navigationBehaviour {
    navigateByPath: (path: string) => void,
    goBack: () => void,
}
const useCustomNavigation = (): navigationBehaviour => {

    const navigation = useNavigation();

    const navigateByPath = (path: string) => {
        //@ts-ignore
        navigation.navigate(path)
    }

    const goBack = () => {
        navigation.goBack();
    }
    return {
        navigateByPath: navigateByPath,
        goBack: goBack,
    }
};

export default useCustomNavigation;