import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoadingState} from "../../Domain/Enums/LoadingState";
import IUser from "../../Domain/User/User";
import {RegisterAsync} from "./Thunks/Register/RegisterAsync";
import IRegisterResponse from "./Thunks/Register/RegisterResponse";
import {LoginAsync} from "./Thunks/Login/LoginAsync";
import ILoginResponse from "./Thunks/Login/LoginResponse";

interface IAuthenticationState {
  loadingState: LoadingState;
  user?: IUser;
  token?: string;
}

const initialState: IAuthenticationState = {
  loadingState: LoadingState.idle,
};

export const AuthenticationSlice = createSlice({
  name: "authenticationSlice",
  initialState: initialState,
  reducers: {
    Logout: state => {
      state.token = undefined;
      state.user = undefined;
    },
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
  },
});

export const {Logout} = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;
