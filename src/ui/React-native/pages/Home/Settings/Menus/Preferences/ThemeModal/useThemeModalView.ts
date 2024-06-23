import {useAppSelector} from "../../../../../../../../app/hook.ts";
import {selectCurrentTheme} from "../../../../../../../../Feature/Configuration/ConfigurationSelector.ts";

interface UseThemeModalViewBehaviour {
    currentTheme: 'light'|'dark',
}
const useThemeModalView = (): UseThemeModalViewBehaviour => {
    const theme = useAppSelector(selectCurrentTheme)
    return {
        currentTheme: theme,
    }
};
export default useThemeModalView;