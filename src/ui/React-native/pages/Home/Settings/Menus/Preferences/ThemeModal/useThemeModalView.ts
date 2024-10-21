import {useAppSelector} from "../../../../../../../../app/hook.ts";
import {selectCurrentTheme} from "../../../../../../../../Feature/Configuration/ConfigurationSelector.ts";
import { Themes } from "../../../../../../../../Feature/Configuration/ConfigurationSlice.ts";

interface UseThemeModalViewBehaviour {
    currentTheme: Themes,
}
const useThemeModalView = (): UseThemeModalViewBehaviour => {
    const theme = useAppSelector(selectCurrentTheme)
    return {
        currentTheme: theme,
    }
};
export default useThemeModalView;