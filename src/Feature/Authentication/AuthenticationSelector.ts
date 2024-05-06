import { RootState } from "../../app/store";

export const selectAuthenticationLoadingState = (state: RootState) => {
    return state.authenticationReducer.loadingState;
}

export const selectToken = (state: RootState) => {
    return state.authenticationReducer.token;
}

export const selectUser = (state: RootState) => {
    return state.authenticationReducer.user;
}