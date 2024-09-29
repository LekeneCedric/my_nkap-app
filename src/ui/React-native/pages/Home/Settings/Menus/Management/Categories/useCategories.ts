import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppSelector } from "../../../../../../../../app/hook";
import ICategory from "../../../../../../../../Domain/Category/Category";
import { selectCategories } from "../../../../../../../../Feature/Category/CategorySelector";
import StringsOperations from "../../../../../../utils/StringsOperations";

interface behaviour {
    filteredCategories: ICategory[],
    searchText: string,
    setSearchText: Dispatch<SetStateAction<string>>
}
const useCategories = (): behaviour => {
    const categories = useAppSelector(selectCategories);
    const [filterCategories, setFilterCategories] = useState<ICategory[]>(categories);
    const {normalizeString} = StringsOperations();
    const [searchText, setSearchText] = useState<string>("");

    useEffect(() => {
        const filteredCategories = categories.filter(c => {
            const stringMatches = normalizeString(c.name).includes(normalizeString(searchText));
            const searchIsEmpty = searchText.length == 0;
            if (stringMatches || searchIsEmpty)
                return c;
        });
        setFilterCategories(filteredCategories);
    }, [categories, searchText]);
    return {
        searchText: searchText,
        setSearchText: setSearchText,
        filteredCategories: filterCategories,
    }
};

export default useCategories;