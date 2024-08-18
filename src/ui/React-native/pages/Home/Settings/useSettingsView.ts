import {useAppDispatch} from "../../../../../app/hook";
import {Logout} from "../../../../../Feature/Authentication/AuthenticationSlice";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import {Icons} from "../../../Global/Icons.ts";
import {routes} from "../../routes";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {persistStore} from "redux-persist";
import {store} from "../../../../../app/store.ts";
import {useToast} from "react-native-toast-notifications";

interface IMenuItem {
    title: string,
    route: string,
    icon: string,
    iconColor: string,
    color: string,
    action?: () => void,
}

export interface IMenu {
    title: string,
    end?: boolean,
    section: IMenuItem[]
}

interface UseSettingsView {
    menuItems: IMenu[]
}

const useSettingsView = (): UseSettingsView => {
    const dispatch = useAppDispatch();
    const {colorPalette: {text, red, gray}} = useTheme();
    const toast = useToast();
    const logout = () => {
        dispatch(Logout());
        const persist = persistStore(store);
        persist.flush().then(() => {
            persist.purge().then(()=>{
                toast.show('Vous avez été déconnecté', {
                    type: 'warning',
                    placement: 'top',
                    duration: 3000
                });
            });
        });
    }
    const menuItems: IMenu[] = [
        {
            title: 'Personalisations',
            section: [
                {
                    title: 'Notifications',
                    route: '',
                    icon: Icons.notification,
                    iconColor: gray,
                    color: text
                },
                {
                    title: 'Préférences',
                    route: routes.home.settings.preferences,
                    icon: Icons.tools,
                    iconColor: gray,
                    color: text
                }
            ]
        },
        {
            title: 'Plus',
            section: [
                {
                    title: 'Stockage & Exportation',
                    route: '',
                    icon: Icons.database,
                    iconColor: gray,
                    color: text
                },
                {
                    title: 'App Info',
                    route: '',
                    icon: Icons.info,
                    iconColor: gray,
                    color: text
                },
                {
                    title: 'Aide',
                    route: '',
                    icon: Icons.help,
                    iconColor: gray,
                    color: text
                }
            ]
        },
        {
            title: 'Compte',
            end: true,
            section: [
                {
                    title: 'Deconnexion',
                    route: '',
                    icon: Icons.logout,
                    iconColor: red,
                    color: red,
                    action: logout
                }
            ]
        }
    ];
    return {
        menuItems: menuItems
    };
}
export default useSettingsView;