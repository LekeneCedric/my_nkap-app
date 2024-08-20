interface useMoneyParserBehaviour {
    parseThousand: (amount: number) => string;
}
const useMoneyParser = (): useMoneyParserBehaviour => {
    const parseThousand = (amount: number) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    return {
        parseThousand: parseThousand
    }
};

export default useMoneyParser;