import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type initialState = {
    theme: 'light'|'dark',
    canSeeAmount: boolean,
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
        }
    },
});

export const {SwitchTheme, SwitchCanSeeAmount} = ConfigurationSlice.actions;
export default ConfigurationSlice.reducer;
