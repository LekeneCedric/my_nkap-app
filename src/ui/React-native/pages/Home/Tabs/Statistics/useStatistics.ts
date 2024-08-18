import {useAppDispatch, useAppSelector} from "../../../../../../app/hook.ts";
import {selectStatisticsCurrentMonth} from "../../../../../../Feature/Statistics/StatisticsSelectors.ts";
import useUtils from "../../../../utils/useUtils.ts";
import {handleNextMonth, handlePreviousMonth} from "../../../../../../Feature/Statistics/StatisticsSlice.ts";

interface useStatistics {
    handlePreviousMonth: () => void,
    handleNextMonth: () => void,
    currentMonth: () => string,
}
const useStatistics = (): useStatistics => {
    const dispatch = useAppDispatch();
    const{
        formatMonthToMonthName
    } = useUtils();
    const currentMonth = useAppSelector(selectStatisticsCurrentMonth);
    const handlePreviousMonthF = () => {
        dispatch(handlePreviousMonth());
    }

    const handleNextMonthF = () => {
        dispatch(handleNextMonth());
    }

    const currentMonthFormatted = () => {
        return formatMonthToMonthName(currentMonth);
    }

    return {
        handlePreviousMonth: handlePreviousMonthF,
        handleNextMonth: handleNextMonthF,
        currentMonth: currentMonthFormatted,
    };
}

export default useStatistics;