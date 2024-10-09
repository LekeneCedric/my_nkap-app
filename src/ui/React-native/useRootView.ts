import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { selectActivationAccountExpTime, selectToken, selectUserStatus } from "../../Feature/Authentication/AuthenticationSelector";
import { DeactivateUserStatus } from "../../Feature/Authentication/AuthenticationSlice";
import { UserStatusEnum } from "../../Domain/User/User";
import TimeConstants from "./Shared/Constants/Time";

interface IUseRootViewBehaviour {
    isAuthenticated: boolean;
    status: UserStatusEnum,
}
const useRoot = (): IUseRootViewBehaviour => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectToken);
    const userStatus = useAppSelector(selectUserStatus);
    const activationAccountExpTime = useAppSelector(selectActivationAccountExpTime);

    
    useEffect(() => {
        const differenceBetweenExpAndCurrTime = Math.floor((new Date().getTime() - activationAccountExpTime)/1000);
        const activationAccountTimeIsPassed = TimeConstants.tenMinutesInSeconds < differenceBetweenExpAndCurrTime;
        if (activationAccountExpTime !== 0 && activationAccountTimeIsPassed) {
            console.warn('deactivate');
            dispatch(DeactivateUserStatus());
        }
    }, [activationAccountExpTime])
    return {
        isAuthenticated: token !== undefined && userStatus === UserStatusEnum.ACTIVATE,
        status: userStatus,
    }
};
export default useRoot;