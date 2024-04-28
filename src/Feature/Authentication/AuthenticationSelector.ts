import { RootState } from "../../app/store";

export const selectAuthenticationLoadingState = (state: RootState) => {
    return state.authenticationReducer.loadingState;
}