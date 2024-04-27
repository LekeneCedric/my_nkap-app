import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {rootReducer} from './reducers/Reducer.ts';
import { professionApiGatewayHttp } from '../Infrastructure/Profession/Gateways/ProfessionApiGatewayHttp.ts';
import { listenerMiddleware } from './listenerMiddleware.ts';

const persistConfig = {
  key: 'my_nkap',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          professionApiGatewayHttp: new professionApiGatewayHttp(),
        },
      },
    }).prepend(listenerMiddleware.middleware),
});

const persistor = persistStore(store);

setupListeners(store.dispatch);
export default persistor;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
