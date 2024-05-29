import { useAppDispatch } from "../../../../app/hook";
import { Logout } from "../../../../Feature/Authentication/AuthenticationSlice";

interface UseSettingsView {
    logout: () => void,
}
const useSettingsView = ():UseSettingsView => {
    const dispatch = useAppDispatch();

    const logout = () => {
        dispatch(Logout())
    }
    return {
        logout: logout,
    };
}
export default useSettingsView;