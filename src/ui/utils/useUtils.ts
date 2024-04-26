interface IUseUtilsBehaviour {
    formatDateToYYYYMMDD(date: Date):string 
}
const useUtils = (): IUseUtilsBehaviour => {

    const formatDateToYYYYMMDD = (date: Date) => {
        const toLocalStringDate = date.toLocaleDateString();    
        return toLocalStringDate.replace(/\//g, "-");
    }

    return {
        formatDateToYYYYMMDD: formatDateToYYYYMMDD,
    }
}
export default useUtils;