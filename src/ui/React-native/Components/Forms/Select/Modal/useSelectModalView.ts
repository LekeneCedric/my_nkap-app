import { useState } from "react"

type useSelectModalViewBehaviour = {
    filterList: any[],
    sortList: (name: string) => void
}
export const useSelectModalView = (initialList : any[]): useSelectModalViewBehaviour => {

    const [filterList, setFilterList] = useState<any[]>(initialList);
    const sortList = (name: string) => {
        if (name.length == 0) setFilterList(initialList);
        const newFilterList = initialList.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
        setFilterList(newFilterList);
    }
    return {
        filterList: filterList,
        sortList: sortList,
    }
}