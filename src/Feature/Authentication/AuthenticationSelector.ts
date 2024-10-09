import { RootState } from "../../app/store";

export const selectAuthenticationLoadingState = (state: RootState) => {
    return state.authenticationReducer.loadingState;
}

export const selectActivationAccountLoadingState = (state: RootState) => {
    return state.authenticationReducer.activationAccountLoadingState;
}

export const selectToken = (state: RootState) => {
    return state.authenticationReducer.token;
}

export const selectUser = (state: RootState) => {
    return state.authenticationReducer.user;
}

export const selectActivationAccountExpTime = (state: RootState) => {
    return state.authenticationReducer.activationAccountExpirationTime;
}

export const selectActivationAccountEmail = (state: RootState) => {
    return state.authenticationReducer.activationAccountEmail;
}

export const selectActivationAccountExpirationTime = (state: RootState): number => {
    return state.authenticationReducer.activationAccountExpirationTime;
}

export const selectUserStatus = (state: RootState) => {
    return state.authenticationReducer.status;
}
