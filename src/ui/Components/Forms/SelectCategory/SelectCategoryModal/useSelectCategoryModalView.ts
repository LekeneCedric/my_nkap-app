import {useState} from "react";
import {useForm, UseFormReturn} from "react-hook-form";
import IAddCategoryForm from "../../../../../Infrastructure/Validators/Forms/Category/AddCategoryForm.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    AddCategoryFormSchemaValidate
} from "../../../../../Infrastructure/Validators/Forms/Category/AddCategoryFormSchemaValidate.ts";

type useSelectCategoryModalViewBehaviour = {
    filterList: any[],
    sortList: (name: string) => void,
    form: UseFormReturn<IAddCategoryForm>,
    onSubmit: (data: IAddCategoryForm) => void,
}
export const useSelectCategoryModalView = (initialList : any[]): useSelectCategoryModalViewBehaviour =>
{
    const form = useForm<IAddCategoryForm>({
        resolver: yupResolver(AddCategoryFormSchemaValidate)
    })
    const onSubmit = async (data: IAddCategoryForm) => {
        console.warn(data);
    }
    const [filterList, setFilterList] = useState<any[]>(initialList);
    const sortList = (name: string) => {
        if (name.length == 0) setFilterList(initialList);
        const newFilterList = initialList.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
        setFilterList(newFilterList);
    }
    return {
        filterList: filterList,
        sortList: sortList,
        form: form,
        onSubmit: onSubmit,
    }
}