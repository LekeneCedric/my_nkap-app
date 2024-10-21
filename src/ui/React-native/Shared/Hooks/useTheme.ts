import { Appearance } from "react-native";
import {useAppDispatch, useAppSelector} from "../../../../app/hook.ts";
import {selectCurrentTheme} from "../../../../Feature/Configuration/ConfigurationSelector.ts";
import { Themes } from "../../../../Feature/Configuration/ConfigurationSlice.ts";
import { useEffect, useState } from "react";

type colorPalette = {
    pageBackground: string,
    containerBackground: string,
    text: string,
    green: string,
    red: string,
    gray: string,
    primaryLight: string,
    primary: string,
    action1: string,
    action1Container: string,
    action1Text: string,
    action2: string,
    action2Text: string,
    action3: string
    action3Text: string,
    light: string,
    placeholder: string,
}

interface useThemeBehaviour {
    colorPalette: colorPalette,
    currentTheme: Themes
}

const useTheme = (): useThemeBehaviour => {
    const currentTheme = useAppSelector(selectCurrentTheme);
    const [colorPalette, setColorPalette] = useState<colorPalette|null>({
        pageBackground: '#26242C',
        containerBackground: '#413F46',
        text: '#FEFEFE',
        green: '#1FA398',
        red: '#A94856',
        gray: '#818181',
        primaryLight: '#97BCFF',
        primary: '#3F5C7C',
        action1: '#8651E5',
        action1Container: '#cfc9ea',
        action1Text: '#FEFEFE',
        action2: '#FEFEFE',
        action2Text: '#FEFEFE',
        action3: '#FEFEFE',
        action3Text: '#FEFEFE',
        light: '#FFFFFF',
        placeholder: '#ffffff7f',
    });
    const updateTheme = () => {
        const systemTheme = Appearance.getColorScheme();
        const theme = currentTheme == 'system' ? systemTheme : currentTheme;
        const correspondingPalette = theme == 'dark' ? {
            pageBackground: '#26242C',
            containerBackground: '#413F46',
            text: '#FEFEFE',
            green: '#1FA398',
            red: '#A94856',
            gray: '#818181',
            primaryLight: '#97BCFF',
            primary: '#3F5C7C',
            action1: '#8651E5',
            action1Container: '#cfc9ea',
            action1Text: '#FEFEFE',
            action2: '#FEFEFE',
            action2Text: '#FEFEFE',
            action3: '#FEFEFE',
            action3Text: '#FEFEFE',
            light: '#FFFFFF',
            placeholder: '#ffffff7f',
        } : {
            pageBackground: '#F2F2F2',
            containerBackground: '#FFFFFF',
            text: '#030303',
            green: '#1DA193',
            red: '#AF3C24',
            gray: '#818181',
            primaryLight: '#97BCFF',
            primary: '#3F5C7C',
            action1: '#8651E5',
            action1Container: '#cfc9ea',
            action1Text: '#FEFEFE',
            action2: '#030303',
            action2Text: '#030303',
            action3: '#030303',
            action3Text: '#030303',
            light: '#FFFFFF',
            placeholder: '#ffffff7f',
        }
        setColorPalette(correspondingPalette);
    }
    

    useEffect(() => {
        updateTheme();
    }, [Appearance.getColorScheme, currentTheme]);
    return {
        colorPalette: colorPalette!,
        currentTheme: currentTheme
    }
}

export default useTheme;