import { useNavigation } from "@react-navigation/native";

interface navigationBehaviour {
    navigateByPath: (path: string) => void,
}
const useCustomNavigation = (): navigationBehaviour => {

    const navigation = useNavigation();

    const navigateByPath = (path: string) => {
        //@ts-ignore
        navigation.navigate(path)
    }
    return {
        navigateByPath: navigateByPath,
    }
};

export default useCustomNavigation;