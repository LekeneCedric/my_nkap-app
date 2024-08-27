import {useAppDispatch} from "../../../../../app/hook";
import {Logout} from "../../../../../Feature/Authentication/AuthenticationSlice";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import {Icons} from "../../../Global/Icons.ts";
import {routes} from "../../routes";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {persistStore} from "redux-persist";
import {store} from "../../../../../app/store.ts";
import {useToast} from "react-native-toast-notifications";
import useCustomTranslation from "../../../Shared/Hooks/useCustomTranslation.ts";
import { Linking } from "react-native";

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
    menuItems: IMenu[],
    linkToMyGithubProfile: () => void,
}

const useSettingsView = (): UseSettingsView => {
    const {translate} = useCustomTranslation();
    const dispatch = useAppDispatch();
    const {colorPalette: {text, red, gray}} = useTheme();
    const toast = useToast();
    const logout = () => {
        dispatch(Logout());
        const persist = persistStore(store);
        persist.flush().then(() => {
            persist.purge().then(()=>{
                toast.show(translate('have_been_disconnect'), {
                    type: 'warning',
                    placement: 'top',
                    duration: 3000
                });
            });
        });
    }
    const menuItems: IMenu[] = [
        {
            title: translate('customizations'),
            section: [
                // {
                //     title: translate('notifications'),
                //     route: '',
                //     icon: Icons.notification,
                //     iconColor: gray,
                //     color: text
                // },
                {
                    title: translate('preferences'),
                    route: routes.home.settings.preferences,
                    icon: Icons.tools,
                    iconColor: gray,
                    color: text
                }
            ]
        },
        {
            title: translate('more'),
            section: [
                // {
                //     title: translate('storage_and_exports'),
                //     route: '',
                //     icon: Icons.database,
                //     iconColor: gray,
                //     color: text
                // },
                // {
                //     title: 'App Info',
                //     route: '',
                //     icon: Icons.info,
                //     iconColor: gray,
                //     color: text
                // },
                {
                    title: translate('help'),
                    route: '',
                    icon: Icons.help,
                    iconColor: gray,
                    color: text
                }
            ]
        },
        {
            title: translate('account'),
            end: true,
            section: [
                {
                    title: translate('logout'),
                    route: '',
                    icon: Icons.logout,
                    iconColor: red,
                    color: red,
                    action: logout
                }
            ]
        }
    ];

    const linkToMyGithubProfile = () => {
        Linking.openURL('https://github.com/LekeneCedric');
    }
    return {
        menuItems: menuItems,
        linkToMyGithubProfile: linkToMyGithubProfile,
    };
}
export default useSettingsView;