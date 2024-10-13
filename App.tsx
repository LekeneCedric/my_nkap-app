import {persistStore} from "redux-persist";
import {store} from "./src/app/store.ts";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {NavigationContainer} from "@react-navigation/native";
import {ToastProvider} from "react-native-toast-notifications";
import Root from "./src/ui/React-native/Root.tsx";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Orientation from "react-native-orientation-locker";
import {useEffect} from "react";

function App(): React.JSX.Element {
  const persistor = persistStore(store);
  useEffect(() => {
    // Lock orientation to portrait mode
    Orientation.lockToPortrait();

    // Optionally, unlock when needed (e.g., when a certain screen should allow rotation)
    // Orientation.unlockAllOrientations();

    // Cleanup the orientation lock when the component unmounts
    return () => {
      Orientation.unlockAllOrientations(); // Restore to default behavior
    };
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <ToastProvider
            placement={"top"}
            animationType={"slide-in"}
            style={{zIndex: 1000}}
          >
            <GestureHandlerRootView>
              <Root />
            </GestureHandlerRootView>
          </ToastProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
