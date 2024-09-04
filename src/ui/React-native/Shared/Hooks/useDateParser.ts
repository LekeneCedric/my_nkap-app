
export interface useDateParserBehaviour {
    day: string,
    month: string,
    year: string,
    week: string
}
const useDateParser = (inputDate: string, currentLanguage: string = 'fr'): useDateParserBehaviour => {

    const date = new Date(inputDate);

    const dayOptions: Intl.DateTimeFormatOptions = { day: '2-digit' };
    const monthOptions: Intl.DateTimeFormatOptions = { month: 'long' };
    const yearOptions: Intl.DateTimeFormatOptions = { year: 'numeric' };
    const weekOptions: Intl.DateTimeFormatOptions = { weekday: 'long' };

    // Use Intl.DateTimeFormat to format each part of the date
    const day = new Intl.DateTimeFormat(currentLanguage, dayOptions).format(date);
    const month = new Intl.DateTimeFormat(currentLanguage, monthOptions).format(date);
    const year = new Intl.DateTimeFormat(currentLanguage, yearOptions).format(date);
    const weekday = new Intl.DateTimeFormat(currentLanguage, weekOptions).format(date);

    return {
        day: day,
        month: month,
        year: year,
        week: weekday
    }
};
export default useDateParser;