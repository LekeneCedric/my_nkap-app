import {useAppDispatch, useAppSelector} from "../../../../app/hook.ts";
import {selectTotalBalance} from "../../../../Feature/Account/AccountSelector.ts";
import {selectCanSeeAmount} from "../../../../Feature/Configuration/ConfigurationSelector.ts";
import {SwitchCanSeeAmount} from "../../../../Feature/Configuration/ConfigurationSlice.ts";

interface useConfigurationBehaviour {
    canSeeAmount: boolean,
    switchCanSeeAmount: () => void,
    displayAmount: (text: string) => string,
}
const useConfiguration = (): useConfigurationBehaviour => {
    const dispatch = useAppDispatch();
    const canSeeAmount = useAppSelector(selectCanSeeAmount);
    const switchCanSeeAmount = () => {
        dispatch(SwitchCanSeeAmount(!canSeeAmount));
    }
    const displayByCanSeeAmountOrNot = (text: string): string => {
        return canSeeAmount ? text : '******'
    }
    return {
        canSeeAmount: canSeeAmount,
        switchCanSeeAmount: switchCanSeeAmount,
        displayAmount: displayByCanSeeAmountOrNot
    };
};
export default useConfiguration;