type StringsOperationsBehaviour = {
    normalizeString: (text: string) => string;
}
const StringsOperations = () : StringsOperationsBehaviour => {
    const normalizeString = (str: string): string =>{
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }
    return {
        normalizeString: normalizeString,
    };
};

export default StringsOperations;