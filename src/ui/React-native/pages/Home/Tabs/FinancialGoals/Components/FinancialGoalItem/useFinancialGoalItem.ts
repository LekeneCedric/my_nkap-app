import React, {useEffect, useState} from "react";
import {IFinancialGoal, FinancialGoalStatus} from "../../../../../../../../Domain/FinancialGoal/FinancialGoal.ts";
import moment from "moment/moment";
import {useAppSelector} from "../../../../../../../../app/hook.ts";
import {
    selectFinancialGoalPercentage,
    selectFinancialGoalStatus
} from "../../../../../../../../Feature/FinancialGoal/FinancialGoalSelector.ts";

type useFinancialGoalItemBehaviour = {
    percentage: number,
    status: FinancialGoalStatus,
    modalDetailsFinancialGoalIsVisible: boolean
    setModalDetailsFinancialGoalIsVisible: React.Dispatch<any>
    formattedDurationEndDate: string
    setFormattedDurationEndDate: React.Dispatch<any>,
}
const useFinancialGoalItem = (data: IFinancialGoal): useFinancialGoalItemBehaviour => {
    const [modalDetailsFinancialGoalIsVisible, setModalDetailsFinancialGoalIsVisible] = useState(false);
    const [formattedDurationEndDate, setFormattedDurationEndDate] = useState('');
    const status = useAppSelector(selectFinancialGoalStatus(data.id));
    const percentage = useAppSelector(selectFinancialGoalPercentage(data.id));

    useEffect(() => {
        moment.locale('fr');
        const now = moment();
        const endDate = moment(data.endDate);
        const duration = moment.duration(endDate.diff(now));
        const formattedDuration = duration.humanize(false);
        setFormattedDurationEndDate(formattedDuration);
    }, [data.isComplete, data.currentAmount]);
    return {
        percentage: percentage,
        status: status,
        modalDetailsFinancialGoalIsVisible: modalDetailsFinancialGoalIsVisible,
        setModalDetailsFinancialGoalIsVisible: setModalDetailsFinancialGoalIsVisible,
        formattedDurationEndDate: formattedDurationEndDate,
        setFormattedDurationEndDate: setFormattedDurationEndDate
    }
};

export default useFinancialGoalItem;