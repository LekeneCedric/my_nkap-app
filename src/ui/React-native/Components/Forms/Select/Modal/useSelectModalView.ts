import { useState } from "react"
import StringsOperations from "../../../../utils/StringsOperations.ts";

type useSelectModalViewBehaviour = {
    filterList: any[],
    sortList: (name: string) => void
}
export const useSelectModalView = (initialList : any[]): useSelectModalViewBehaviour => {
    const {normalizeString} = StringsOperations();
    const [filterList, setFilterList] = useState<any[]>(initialList);
    const sortList = (searchElement: string) => {
        if (searchElement.length == 0) setFilterList(initialList);
        const newFilterList = initialList.filter(item => normalizeString(item.name).includes(normalizeString(searchElement)));
        setFilterList(newFilterList);
    }
    return {
        filterList: filterList,
        sortList: sortList,
    }
}