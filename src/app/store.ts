import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {rootReducer} from './reducers/Reducer.ts';
import { ProfessionApiGatewayHttp } from '../Infrastructure/Profession/Gateways/ProfessionApiGatewayHttp.ts';
import { listenerMiddleware } from './listenerMiddleware.ts';
import AuthenticationApiGatewayHttp from '../Infrastructure/Authentication/Gateways/AuthenticationApiGatewayHttp.ts';
import AccountApiGatewayHttp from '../Infrastructure/Account/Gateways/AccountApiGatewayHttp.ts';

const persistConfig = {
  key: 'my_nkap_',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          professionApiGatewayHttp: new ProfessionApiGatewayHttp(),
          authenticationApiGatewayHttp: new AuthenticationApiGatewayHttp(),
          accountApiGatewayHttp: new AccountApiGatewayHttp(),
        },
      },
    }).prepend(listenerMiddleware.middleware),
});

const persistor = persistStore(store);

setupListeners(store.dispatch);
export default persistor;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
