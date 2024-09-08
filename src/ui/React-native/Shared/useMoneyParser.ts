import { useAppSelector } from "../../../app/hook";
import { selectCurrency } from "../../../Feature/Configuration/ConfigurationSelector";
import { deserializeFunction } from "../utils/useUtils";

interface useMoneyParserBehaviour {
    parseThousand: (amount: number) => string;
}

const useMoneyParser = (): useMoneyParserBehaviour => {
    const currentCurrency = useAppSelector(selectCurrency);
    
    const parseThousand = (amount: number) => {
        if (currentCurrency && currentCurrency.formatFunc) {
            const formatFunc: (amount: number) => string = new Function('return ' + currentCurrency.formatFunc)();
            
            return formatFunc(amount);
        }
        return amount.toString();
        
    }

    return {
        parseThousand: parseThousand
    }
};

export default useMoneyParser;