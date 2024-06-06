import {useState} from "react";

type useSelectIconModalViewBehaviour = {
    sortList: (name: string) => void,
    filterList: any
}
const useSelectIconModalView = (initialList: any): useSelectIconModalViewBehaviour => {
    const [filterList, setFilterList] = useState<any>(initialList);
    const sortList = (name: string) => {
        if (name.length == 0) setFilterList(initialList);
        const finalList = {};
        Object.keys(initialList).map((key) => {
            const values = initialList[key].filter();

        })
    };
    return {
        filterList: filterList,
        sortList: sortList,
    }
};
export default useSelectIconModalView;