import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../../../../app/hook"
import { IProfession } from "../../../../../../Domain/profession/Profession"
import { selectLoadingProfessionState, selectProfessions } from "../../../../../../Feature/Profession/ProfessionSelector"
import { GetAllProfessionAsync } from "../../../../../../Feature/Profession/Thunks/GetAll/GetAllProfessionAsync"
import { LoadingState } from "../../../../../../Domain/Enums/LoadingState"

interface useRegisterFormViewBehaviour {
    professions: IProfession[],
    loadingState: LoadingState,
    refresh: () => void,
}
const useRegisterFormView = (): useRegisterFormViewBehaviour => {
    const dispatch = useAppDispatch();

    const professions = useAppSelector(selectProfessions);
    const loadingProfessionState = useAppSelector(selectLoadingProfessionState);
    const refresh = () => {
        dispatch(GetAllProfessionAsync());
    }
    useEffect(() => {
        if (professions.length < 1) {
            dispatch(GetAllProfessionAsync());
        }
    }, [])


    return {
        professions: professions,
        loadingState: loadingProfessionState,
        refresh: refresh,
    }
}
export default useRegisterFormView;