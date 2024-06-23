import { useAppDispatch } from "../../../../../app/hook";
import { Logout } from "../../../../../Feature/Authentication/AuthenticationSlice";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import {Icons} from "../../../Global/Icons.ts";
import {routes} from "../../routes";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface IMenuItem {
    title: string,
    route: string,
    icon: string,
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
const useSettingsView = ():UseSettingsView => {
    const dispatch = useAppDispatch();
    const {colorPalette: {text, red}} = useTheme();
    const logout = () => {
        dispatch(Logout())
    }
    const menuItems: IMenu[] = [
        {
            title: 'Personalisations',
            section: [
                {
                  title: 'Notifications',
                  route: '',
                  icon: Icons.notification,
                  color: text
                },
                {
                    title: 'Préférences',
                    route: routes.home.settings.preferences,
                    icon: Icons.tools,
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
                    color: text
                },
                {
                    title: 'App Info',
                    route: '',
                    icon: Icons.info,
                    color: text
                },
                {
                    title: 'Aide',
                    route: '',
                    icon: Icons.help,
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