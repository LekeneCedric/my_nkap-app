import {AddOperationFormBehaviour} from "../useAddOperationView.ts";
import {View} from "react-native";
import {Controller} from "react-hook-form";
import SelectForm from "../../../../../Components/Forms/Select/SelectForm.tsx";
import {Icons} from "../../../../../Global/Icons.ts";
import ISelectItem from "../../../../../Components/Forms/Select/SelectItem.ts";
import {IOperationTypeEnum} from "../../../../../../Domain/Operation/Operation.ts";
import {Theme} from "../../../../../Global/Theme.ts";
import CheckedForm from "../../../../../Components/Forms/Checked/CheckedForm.tsx";
import {InputForm} from "../../../../../Components/Forms/Input/InputForm.tsx";
import InputBirthDateForm from "../../../../../Components/Forms/InputBirthDate/InputBirthDateForm.tsx";
import InputTextAreaForm from "../../../../../Components/Forms/InputTextArea/InputTextAreaForm.tsx";
import ButtonForm from "../../../../../Components/Forms/Button/ButtonForm.tsx";
import VerticalSeparator from "../../../../../Components/Shared/VerticalSeparator/VerticalSeparator.tsx";
import SelectCategoryForm from "../../../../../Components/Forms/SelectCategory/SelectCategoryForm.tsx";
import ISelectCategoryItem from "../../../../../Components/Forms/SelectCategory/SelectCategoryItem.ts";
import useTheme from "../../../../../Shared/Hooks/useTheme.ts";

type props = {
    addOperationFormBehaviour: AddOperationFormBehaviour,
    accounts: ISelectItem[],
    categories: ISelectCategoryItem[],
}
const AddOperationForm = ({addOperationFormBehaviour, accounts, categories}: props) => {
    const {form, onSubmit, loadingState} = addOperationFormBehaviour;
    const {formState: {errors}, control, handleSubmit} = form;
    const {colorPalette: {pageBackground, containerBackground, text, action1, red, green}} = useTheme();
    return <View style={{flexDirection: 'column', backgroundColor: containerBackground}}>
        <Controller
            control={control}
            name={"accountId"}
            render={({field}) => (
                <SelectForm
                    icon={Icons.walletOutline}
                    errorMessage={errors.accountId?.message}
                    label={'Compte'}
                    field={field}
                    placeholder={'Sélectionnez le compte correspondant'}
                    list={accounts}
                />
            )}
        />
        <Controller
            control={control}
            name={'categoryId'}
            render={({field}) => (
                <SelectCategoryForm
                    icon={Icons.category}
                    errorMessage={errors.categoryId?.message}
                    label={'Catégorie'}
                    field={field}
                    placeholder={'Sélectionnez la catégorie de l\'opération'}
                    list={categories}
                />
            )}
        />
        <Controller
            control={control}
            name={'type'}
            render={({field}) => (
                <CheckedForm
                    errorMessage={errors.type?.message}
                    label={'Type d\'opération'}
                    field={field}
                    values={[
                        {id: IOperationTypeEnum.INCOME, label: 'Revenu', color: Theme.green},
                        {id: IOperationTypeEnum.EXPENSE, label: 'Dépense', color: Theme.red},
                    ]}
                />
            )}
        />
        <Controller
            control={control}
            name={'amount'}
            render={({field}) => (
                <InputForm
                    type={'amount'}
                    icon={Icons.wallet}
                    label={'Montant'}
                    field={field}
                    errorMessage={errors.amount?.message}
                    keyboardType={'numeric'}
                    placeholder={'Entrez le montant de l\'opération '}
                />
            )}
        />

        <Controller
            control={control}
            name={'date'}
            render={({field}) => (
                <InputBirthDateForm
                    mode={'datetime'}
                    errorMessage={errors.date?.message}
                    label={'Date de l\'opération'}
                    field={field}
                    placeholder={'Sélectionnez la date de l\'opération'}
                />
            )}
        />

        <Controller
            control={control}
            name={'details'}
            render={({field}) => (
                <InputTextAreaForm
                    label={'Description'}
                    field={field}
                    errorMessage={errors.details?.message}
                    placeholder={'Des détails concernant l\'opération ?'}
                />
            )}
        />
        <VerticalSeparator percent={3} />
        <ButtonForm loading={loadingState} loadingLabel={'Enregistrement ...'} label={'Enregistrer'} handleClick={handleSubmit(onSubmit)} />
        <VerticalSeparator percent={10} />
    </View>
};
export default AddOperationForm;