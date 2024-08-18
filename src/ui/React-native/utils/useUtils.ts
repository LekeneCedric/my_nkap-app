interface IUseUtilsBehaviour {
    formatDateToYYYYMMDD(date: Date):string,
    formatDateToYYYYMMDDHIS(date: Date): string,
    formatMonthToMonthName(month: number): string,
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

    const formatMonthToMonthName = (month: number): string => {
        switch (month) {
            case 1:
                return 'Janvier';
            case 2:
                return 'Février';
            case 3:
                return 'Mars';
            case 4:
                return 'Avril';
            case 5:
                return 'Mai';
            case 6:
                return 'Juin';
            case 7:
                return 'Juillet';
            case 8:
                return 'Août';
            case 9:
                return 'Septembre';
            case 10:
                return 'Octobre';
            case 11:
                return 'Novembre';
            case 12:
                return 'Décembre';
            default:
                return '';
        }
    }
    return {
        formatDateToYYYYMMDD: formatDateToYYYYMMDD,
        formatDateToYYYYMMDDHIS: formatDateToYYYYMMDDHIS,
        formatMonthToMonthName: formatMonthToMonthName,
    }
}
export default useUtils;