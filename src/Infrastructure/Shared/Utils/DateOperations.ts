export const formatDateToYYYYMMDD = (date: Date) => {
    const pad = (num: number) => String(num).padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Months are zero-based
    const day = pad(date.getDate());

    return `${year}-${month}-${day}`;
};

export const formatDateToReadable = (date: Date, todayFormatted: string, currentLanguage: string): string => {
    const today = new Date();
    if ((today.getMonth() == date.getMonth()) && (today.getDay() == date.getDay())) {
        return todayFormatted;
    }
    return date.toLocaleDateString(currentLanguage, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}