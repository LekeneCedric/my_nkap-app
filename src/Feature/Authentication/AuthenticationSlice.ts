import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoadingState} from "../../Domain/Enums/LoadingState";
import IUser, { UserStatusEnum } from "../../Domain/User/User";
import {RegisterAsync} from "./Thunks/Register/RegisterAsync";
import IRegisterResponse from "./Thunks/Register/RegisterResponse";
import {LoginAsync} from "./Thunks/Login/LoginAsync";
import ILoginResponse from "./Thunks/Login/LoginResponse";
import SendRecoverPasswordCodeAsync from "./Thunks/SendRecoverPasswordCode/SendRecoverPasswordCodeAsync";
import RecoverPasswordAsync from "./Thunks/RecoverPassword/RecoverPasswordAsync";
import VerificationAccountAsync from "./Thunks/VerificationAccount/VerificationAccountAsync";
import IVerificationAccountResponse from "./Thunks/VerificationAccount/VerificationAccountResponse";

interface IAuthenticationState {
  loadingState: LoadingState;
  activationAccountLoadingState: LoadingState;
  user?: IUser;
  token?: string;
  status: UserStatusEnum,
  activationAccountExpirationTime: number,
  activationAccountEmail: string,
}

const initialState: IAuthenticationState = {
  loadingState: LoadingState.idle,
  activationAccountLoadingState: LoadingState.idle,
  status: UserStatusEnum.DEACTIVATE,
  activationAccountExpirationTime: 0,
  activationAccountEmail: '',
};

export const AuthenticationSlice = createSlice({
  name: "authenticationSlice",
  initialState: initialState,
  reducers: {
    Logout: state => {
      state.token = undefined;
      state.user = undefined;
      state.status = UserStatusEnum.DEACTIVATE;
      state.loadingState = LoadingState.idle;
      state.activationAccountLoadingState = LoadingState.idle;
    },
    DeactivateUserStatus: state => {
      state.status = UserStatusEnum.DEACTIVATE;
      state.activationAccountLoadingState = LoadingState.idle;
    },
    SetActivationAccountEmail: (state, {payload: {email}}: PayloadAction<{email: string}>) => {
      state.activationAccountEmail = email;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(RegisterAsync.pending, state => {
        state.loadingState = LoadingState.pending;
      })
      .addCase(
        RegisterAsync.fulfilled,
        (state, {payload}: PayloadAction<IRegisterResponse>) => {
          state.loadingState = LoadingState.success;
          state.token = payload.token;
          state.user = payload.user;
          state.status = UserStatusEnum.PENDING;
          state.activationAccountExpirationTime = new Date().getTime();
        },
      )
      .addCase(RegisterAsync.rejected, state => {
        state.loadingState = LoadingState.failed;
      });
    builder
      .addCase(LoginAsync.pending, state => {
        state.loadingState = LoadingState.pending;
      })
      .addCase(
        LoginAsync.fulfilled,
        (state, {payload}: PayloadAction<ILoginResponse>) => {
          state.loadingState = LoadingState.success;
          state.token = payload.token;
          state.user = payload.user;
        },
      )
      .addCase(LoginAsync.rejected, state => {
        state.loadingState = LoadingState.failed;
      });
    builder
      .addCase(SendRecoverPasswordCodeAsync.pending, state => {
        state.loadingState = LoadingState.pending;
      })
      .addCase(SendRecoverPasswordCodeAsync.fulfilled, state => {
        state.loadingState = LoadingState.success;
      })
      .addCase(SendRecoverPasswordCodeAsync.rejected, state => {
        state.loadingState = LoadingState.failed;
      });
    builder
      .addCase(RecoverPasswordAsync.pending, state => {
        state.loadingState = LoadingState.pending;
      })
      .addCase(RecoverPasswordAsync.fulfilled, state => {
        state.loadingState = LoadingState.success;
      })
      .addCase(RecoverPasswordAsync.rejected, state => {
        state.loadingState = LoadingState.failed;
      });
    builder
      .addCase(VerificationAccountAsync.pending, state => {
        state.activationAccountLoadingState = LoadingState.pending;
      })
      .addCase(VerificationAccountAsync.fulfilled, (state, {payload: {accountVerified}}: PayloadAction<IVerificationAccountResponse>) => {
        if (accountVerified) {
          state.activationAccountLoadingState = LoadingState.success;
          state.status = UserStatusEnum.ACTIVATE;
          state.activationAccountExpirationTime = 0;
        }
        if (!accountVerified) {
          state.activationAccountLoadingState = LoadingState.idle;
        }
      })
      .addCase(VerificationAccountAsync.rejected, state => {
        state.activationAccountLoadingState = LoadingState.failed;
      })
  },
});

export const {Logout, DeactivateUserStatus, SetActivationAccountEmail} = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;
