import {string} from "yup";

interface IUseUtilsBehaviour {
    formatDateToYYYYMMDD(date: Date):string,
    formatDateToYYYYMMDDHIS(date: Date): string,
}
const useUtils = (): IUseUtilsBehaviour => {

    const formatDateToYYYYMMDD = (date: Date) => {
        const pad = (num: number) => String(num).padStart(2, '0');

        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1); // Months are zero-based
        const day = pad(date.getDate());

        return `${year}-${month}-${day}`;
    }

    const formatDateToYYYYMMDDHIS = (date: Date) => {
        const pad = (num: number) => String(num).padStart(2, '0');

        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1); // Months are zero-based
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
    return {
        formatDateToYYYYMMDD: formatDateToYYYYMMDD,
        formatDateToYYYYMMDDHIS: formatDateToYYYYMMDDHIS
    }
}
export default useUtils;