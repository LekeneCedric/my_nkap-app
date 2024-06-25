import {useAppDispatch, useAppSelector} from "../../../../../app/hook.ts";
import {selectTotalBalance} from "../../../../../Feature/Account/AccountSelector.ts";
import {selectCanSeeAmount} from "../../../../../Feature/Configuration/ConfigurationSelector.ts";
import {SwitchCanSeeAmount} from "../../../../../Feature/Configuration/ConfigurationSlice.ts";

interface UseHomeScreenHeaderBehaviour {
    totalBalance: number,
}

const useHomeScreenHeader = (): UseHomeScreenHeaderBehaviour => {
    const totalBalance = useAppSelector(selectTotalBalance);
    return {
        totalBalance: totalBalance,
    };
};
export default useHomeScreenHeader;