import { useAppDispatch } from "../../../../app/hook";
import { Logout } from "../../../../Feature/Authentication/AuthenticationSlice";

interface IMenuItem {
    icon: string,
    title: string,
    route: string,
    color: string
}
interface IMenu {
    title: string,
    section: IMenuItem[]
}
interface UseSettingsView {
    menuItems: IMenu[]
}
const useSettingsView = ():UseSettingsView => {
    const dispatch = useAppDispatch();
    const menuItems: IMenu[] = [

    ];
    return {
        menuItems: menuItems
    };
}
export default useSettingsView;