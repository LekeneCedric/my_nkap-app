interface IUseUtilsBehaviour {
    formatDateToYYYYMMDD(date: Date):string,
    formatDateToYYYYMMDDHIS(date: Date): string,
    formatMonthToMonthName(month: number, currentLanguage: string): string,
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

    const formatMonthToMonthName = (month: number, currentLanguage: "en"|"fr"): string => {
        const months = {
            "en": [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ],
            "fr": [
                'Janvier',
                'Février',
                'Mars',
                'Avril',
                'Mai',
                'Juin',
                'Juillet',
                'Août',
                'Septembre',
                'Octobre',
                'Novembre',
                'Décembre'
            ]
        }
        if (!months[currentLanguage])
            return months["en"][month-1];
        return months[currentLanguage][month-1]
    }
    return {
        formatDateToYYYYMMDD: formatDateToYYYYMMDD,
        formatDateToYYYYMMDDHIS: formatDateToYYYYMMDDHIS,
        formatMonthToMonthName: formatMonthToMonthName,
    }
}
export default useUtils;