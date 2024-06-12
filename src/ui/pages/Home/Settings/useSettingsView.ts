import { useAppDispatch } from "../../../../app/hook";
import { Logout } from "../../../../Feature/Authentication/AuthenticationSlice";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import {Icons} from "../../../Global/Icons.ts";
import {routes} from "../../routes";

interface IMenuItem {
    title: string,
    route: string,
    icon: string,
    color: string
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
    const {colorPalette: {text, gray}} = useTheme();
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
            end: true,
            section: [
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
        }
    ];
    return {
        menuItems: menuItems
    };
}
export default useSettingsView;