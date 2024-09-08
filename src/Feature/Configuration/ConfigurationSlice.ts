import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import ICurrencyFormat from "../../Domain/Shared/CurrencyFormat";
import { serializeFunction } from "../../ui/React-native/utils/useUtils";

export type ICurrencyFormatSlice = {
    currency: string,
    example: string,
    formatFunc: string
}
type initialState = {
    theme: 'light'|'dark',
    canSeeAmount: boolean,
    currency?: ICurrencyFormatSlice
}
const initialState: initialState = {
    theme: 'dark',
    canSeeAmount: true,
}

const ConfigurationSlice = createSlice({
    name: 'configuration',
    initialState: initialState,
    reducers: {
        SwitchTheme: (state, {payload}: PayloadAction<'light'|'dark'>) => {
            state.theme = payload;
        },
        SwitchCanSeeAmount: (state, {payload}: PayloadAction<boolean>) => {
            state.canSeeAmount = payload;
        },
        SwitchCurrency: (state, {payload}: PayloadAction<ICurrencyFormat>) => {
            state.currency = payload;
        }
    },
});

export const {SwitchTheme, SwitchCanSeeAmount, SwitchCurrency} = ConfigurationSlice.actions;
export default ConfigurationSlice.reducer;
