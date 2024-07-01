import {useAppSelector} from "../../../../../app/hook.ts";
import {selectAccounts, selectTotalBalance} from "../../../../../Feature/Account/AccountSelector.ts";
import IAccount from "../../../../../Domain/Account/Account.ts";
import {Animated, Easing} from "react-native";
import {useEffect, useRef} from "react";

interface useAccountViewBehaviour {
    totalBalance: number,
    accounts: IAccount[],
    bounceValue: Animated.Value;
}
const useAccountView = (): useAccountViewBehaviour=>{
    const totalBalance = useAppSelector(selectTotalBalance);
    const accounts = useAppSelector(selectAccounts);
    const bounceValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const startBouncing = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(bounceValue, {
                        toValue: 4,
                        duration: 500,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                    Animated.timing(bounceValue, {
                        toValue: 0,
                        duration: 500,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        };

        startBouncing();
    }, []);
    return {
        totalBalance: totalBalance,
        accounts: accounts,
        bounceValue: bounceValue
    }
};
export default useAccountView;