import {useForm, UseFormReturn} from "react-hook-form";
import {LoadingState} from "../../../../../../../../../Domain/Enums/LoadingState";
import IAddCategoryForm from "../../../../../../../../../Infrastructure/Validators/Forms/Category/AddCategoryForm";
import {yupResolver} from "@hookform/resolvers/yup";
import {AddCategoryFormSchemaValidate} from "../../../../../../../../../Infrastructure/Validators/Forms/Category/AddCategoryFormSchemaValidate";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../../../app/hook";
import {selectCategoryLoadingState} from "../../../../../../../../../Feature/Category/CategorySelector";
import ISaveCategoryCommand from "../../../../../../../../../Feature/Category/Thunks/Save/SaveCategoryCommand";
import {selectUser} from "../../../../../../../../../Feature/Authentication/AuthenticationSelector";
import ICategory from "../../../../../../../../../Domain/Category/Category";
import SaveCategoryAsync from "../../../../../../../../../Feature/Category/Thunks/Save/SaveCategoryAsync";
import useCustomNavigation from "../../../../../../../utils/useNavigation";
import {useToast} from "react-native-toast-notifications";
import useCustomTranslation from "../../../../../../../Shared/Hooks/useCustomTranslation";
import {UpdateCategory} from "../../../../../../../../../Feature/Category/CategorySlice";

type props = {
  loading: LoadingState;
  form: UseFormReturn<IAddCategoryForm>;
  onSubmit: (data: IAddCategoryForm) => void;
};
const useCategory = (categoryData: ICategory, closeModal: () => void): props => {
  const dispatch = useAppDispatch();
  const {translate} = useCustomTranslation();
  const userId = useAppSelector(selectUser)!.userId;
  const loading = useAppSelector(selectCategoryLoadingState);
  const form = useForm<IAddCategoryForm>({
    resolver: yupResolver(AddCategoryFormSchemaValidate),
  });
  const toast = useToast();

  const onSubmit = async (data: IAddCategoryForm) => {
    const command = {
      userId: userId,
      color: data.color,
      icon: data.icon,
      name: data.name,
      description: data.description,
      categoryId: categoryData.id,
    } as ISaveCategoryCommand;

    const response = await dispatch(SaveCategoryAsync(command));

    if (SaveCategoryAsync.fulfilled.match(response)) {
      form.reset();
      closeModal();
      // @ts-ignore
      toast.show(translate(response.payload.message), {
        type: "success",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
        swipeEnabled: true,
      });
      dispatch(
        UpdateCategory({
          id: categoryData.id,
          icon: data.icon,
          name: data.name,
          color: data.color,
          description: data.description,
        }),
      );
    }
    if (SaveCategoryAsync.rejected.match(response)) {
      toast.show(translate("something-went-wrong"), {
        type: "success",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
        swipeEnabled: true,
      });
    }
  };
  return {
    loading: loading,
    form: form,
    onSubmit: onSubmit,
  };
};
export default useCategory;
