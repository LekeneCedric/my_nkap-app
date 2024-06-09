import {useAppDispatch, useAppSelector} from "../../../app/hook.ts";
import {selectCurrentTheme} from "../../../Feature/Configuration/ConfigurationSelector.ts";
import {useEffect, useState} from "react";
import {SwitchTheme} from "../../../Feature/Configuration/ConfigurationSlice.ts";

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
    action1Text: string,
    action2: string,
    action2Text: string,
    action3: string
    action3Text: string
}

interface useThemeBehaviour {
    colorPalette: colorPalette,
}

const useTheme = (): useThemeBehaviour => {
    const dispatch = useAppDispatch();
    const currentTheme = useAppSelector(selectCurrentTheme);
    const colorPalette = currentTheme == 'dark' ? {
        pageBackground: '#26242C',
        containerBackground: '#413F46',
        text: '#FEFEFE',
        green: '#1FA398',
        red: '#A94856',
        gray: '#A9A9AF',
        primaryLight: '#97BCFF',
        primary: '#3F5C7C',
        action1: '#8651E5',
        action1Text: '#FEFEFE',
        action2: '#FEFEFE',
        action2Text: '#FEFEFE',
        action3: '#FEFEFE',
        action3Text: '#FEFEFE',
    } : {
        pageBackground: '#F2F2F2',
        containerBackground: '#FFFFFF',
        text: '#030303',
        green: '#1DA193',
        red: '#AF3C24',
        gray: '#C2C3C2',
        primaryLight: '#97BCFF',
        primary: '#3F5C7C',
        action1: '#8651E5',
        action1Text: '#FEFEFE',
        action2: '#030303',
        action2Text: '#030303',
        action3: '#030303',
        action3Text: '#030303',
    }
    useEffect(() => {
        dispatch(SwitchTheme('light'))
    }, []);
    return {
        colorPalette: colorPalette!,
    }
}

export default useTheme;