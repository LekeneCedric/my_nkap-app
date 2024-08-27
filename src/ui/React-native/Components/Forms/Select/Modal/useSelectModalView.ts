import { Dispatch, SetStateAction, useEffect, useState } from "react"
import StringsOperations from "../../../../utils/StringsOperations.ts";

type useSelectModalViewBehaviour = {
    inputSearch: string,
    setInputSearch: Dispatch<SetStateAction<string>>,
    filterList: any[],
    sortList: (name: string) => void,
    clearSearch: (shouldCloseIfEmptySearch: boolean) => void,
}
export const useSelectModalView = (initialList : any[], closeModal: () => void,): useSelectModalViewBehaviour => {
    const [inputSearch, setInputSearch] = useState<string>('');
    const {normalizeString} = StringsOperations();
    const [filterList, setFilterList] = useState<any[]>(initialList);
    const sortList = (searchElement: string) => {
        if (searchElement.length == 0) setFilterList(initialList);
        const newFilterList = initialList.filter(item => normalizeString(item.name).includes(normalizeString(searchElement)));
        setFilterList(newFilterList);
    }
    const clearSearch = (shouldCloseIfEmptySearch: boolean = false) => {
        if (inputSearch.length > 0) {
            setInputSearch('');
            sortList('');
            return;
        }
        if (shouldCloseIfEmptySearch) {
            closeModal();
        }
    }
    useEffect(() => {
        setFilterList(initialList);
        clearSearch();
    }, [initialList]);
    return {
        inputSearch: inputSearch,
        setInputSearch: setInputSearch,
        filterList: filterList,
        sortList: sortList,
        clearSearch: clearSearch,
    }
}