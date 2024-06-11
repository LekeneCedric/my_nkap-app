import { useAppDispatch } from "../../../../app/hook";
import { Logout } from "../../../../Feature/Authentication/AuthenticationSlice";

interface IMenuItem {

}
interface UseSettingsView {
    menuItems: IMenuItem[]
}
const useSettingsView = ():UseSettingsView => {
    const dispatch = useAppDispatch();
    const menuItems: IMenuItem[] = [

    ];
    return {
        menuItems: menuItems
    };
}
export default useSettingsView;