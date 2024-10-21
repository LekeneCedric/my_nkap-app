export const isDayAfter = (time: number) => {
    let savedDate = new Date(time);
    let currentDate = new Date();

    let savedYear = savedDate.getFullYear();
    let savedMonth = savedDate.getMonth();
    let savedDay = savedDate.getDate();

    let currYear = currentDate.getFullYear();
    let currMonth = currentDate.getMonth();
    let currDay = currentDate.getDate();

    if (
        savedYear == currYear &&
        savedMonth == currMonth &&
        savedDay == currDay
    ) {
        return false
    }
    return true;
}