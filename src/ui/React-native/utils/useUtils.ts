interface IUseUtilsBehaviour {
  formatDateToYYYYMMDD(date: Date): string;
  formatDateToYYYYMMDDHIS(date: Date): string;
  formatMonthToMonthName(month: number, currentLanguage: string): string;
  capitalizeFirstLetter(text: string): string;
  formatTimeToMMSS(seconds: number): string;
}

export const serializeFunction = (func: Function): string => {
  return func.toString();
};

export const deserializeFunction = (
  funcString: string,
): ((amount: number) => string) => {
  return new Function("return " + funcString)() as (amount: number) => string;
};

const useUtils = (): IUseUtilsBehaviour => {
  const capitalizeFirstLetter = (str: string): string => {
    if (!str) return str; // Return empty string if input is empty
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formatDateToYYYYMMDD = (date: Date) => {
    const pad = (num: number) => String(num).padStart(2, "0");

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Months are zero-based
    const day = pad(date.getDate());

    return `${year}-${month}-${day}`;
  };

  const formatDateToYYYYMMDDHIS = (date: Date) => {
    const pad = (num: number) => String(num).padStart(2, "0");

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Months are zero-based
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const formatTimeToMMSS = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  };

  const formatMonthToMonthName = (
    month: number,
    currentLanguage: "en" | "fr" | "de",
  ): string => {
    const months = {
      en: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      fr: [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
      ],
      de: [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember",
      ],
    };
    if (!months[currentLanguage]) return months["en"][month - 1];
    return months[currentLanguage][month - 1];
  };

  return {
    formatDateToYYYYMMDD: formatDateToYYYYMMDD,
    formatDateToYYYYMMDDHIS: formatDateToYYYYMMDDHIS,
    formatMonthToMonthName: formatMonthToMonthName,
    capitalizeFirstLetter: capitalizeFirstLetter,
    formatTimeToMMSS: formatTimeToMMSS,
  };
};
export default useUtils;
