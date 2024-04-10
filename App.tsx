import {persistStore} from 'redux-persist';
import {store} from './src/app/store.ts';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {ToastProvider} from 'react-native-toast-notifications';
import Root from './src/ui/Root.tsx';

function App(): React.JSX.Element {
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <ToastProvider>
            <Root />
          </ToastProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
