import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type initialState = {
    theme: 'light'|'dark'
}
const initialState: initialState = {
    theme: 'dark',
}

const ConfigurationSlice = createSlice({
    name: 'configuration',
    initialState: initialState,
    reducers: {
        SwitchTheme: (state, {payload}: PayloadAction<'light'|'dark'>) => {
            state.theme = payload;
        }
    },
});

export const {SwitchTheme} = ConfigurationSlice.actions;
export default ConfigurationSlice.reducer;
