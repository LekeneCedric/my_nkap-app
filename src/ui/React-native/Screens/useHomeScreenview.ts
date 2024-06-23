import { useAppSelector } from "../../../app/hook"
import { selectUser } from "../../../Feature/Authentication/AuthenticationSelector";

interface useHomeScreenHeaderviewBehaviour {
    username: string,
}
const useHomeScreenView = (): useHomeScreenHeaderviewBehaviour => {
    const userName = useAppSelector(selectUser)?.username!;
    
    return {
        username: userName
    }
};
export default useHomeScreenView;