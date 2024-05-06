import { useAppSelector } from "../app/hook";
import { selectToken } from "../Feature/Authentication/AuthenticationSelector";

interface IUseRootViewBehaviour {
    isAuthenticated: boolean;
}
const useRootView = (): IUseRootViewBehaviour => {

    const token = useAppSelector(selectToken);

    return {
        isAuthenticated: token !== undefined,
    }
};
export default useRootView;