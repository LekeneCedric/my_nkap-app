import {AddOperationFormBehaviour} from "../useAddOperationView.ts";
import {ActivityIndicator, Modal, Text, TouchableOpacity, View} from "react-native";
import {Controller} from "react-hook-form";
import SelectForm from "../../../../Components/Forms/Select/SelectForm.tsx";
import {Icons} from "../../../../Global/Icons.ts";
import ISelectItem from "../../../../Components/Forms/Select/SelectItem.ts";
import {IOperationTypeEnum} from "../../../../../../Domain/Operation/Operation.ts";
import {Theme} from "../../../../Global/Theme.ts";
import CheckedForm from "../../../../Components/Forms/Checked/CheckedForm.tsx";
import {InputForm} from "../../../../Components/Forms/Input/InputForm.tsx";
import InputDateForm from "../../../../Components/Forms/InputBirthDate/InputBirthDateForm.tsx";
import InputTextAreaForm from "../../../../Components/Forms/InputTextArea/InputTextAreaForm.tsx";
import ButtonForm from "../../../../Components/Forms/Button/ButtonForm.tsx";
import VerticalSeparator from "../../../../Components/Shared/VerticalSeparator/VerticalSeparator.tsx";
import SelectCategoryForm from "../../../../Components/Forms/SelectCategory/SelectCategoryForm.tsx";
import ISelectCategoryItem from "../../../../Components/Forms/SelectCategory/SelectCategoryItem.ts";
import useTheme from "../../../../Shared/Hooks/useTheme.ts";
import {FontSize} from "../../../../Global/FontSize.ts";
import {LoadingState} from "../../../../../../Domain/Enums/LoadingState.ts";
import {IconSizes} from "../../../../Global/IconSizes.ts";
import {useState} from "react";
import ValidateActionModalView from "../../../../Components/Modals/ValidateActionModal/ValidateActionModalView.tsx";
import useNavigation from "../../../../utils/useNavigation.ts";
import {HomeRoutes} from "../../../routes/HomeRoutes.ts";
import useCustomTranslation from "../../../../Shared/Hooks/useCustomTranslation.ts";

type props = {
    addOperationFormBehaviour: AddOperationFormBehaviour,
    accounts: ISelectItem[],
    categories: ISelectCategoryItem[],
    isUpdate?: boolean,
    onDeleteOperation?: () => void
}
const AddOperationForm = ({addOperationFormBehaviour, accounts, categories, isUpdate, onDeleteOperation}: props) => {
    const {translate} = useCustomTranslation();
    const navigation = useNavigation();
    const {form, onSubmit, loadingState} = addOperationFormBehaviour;
    const {formState: {errors}, control, handleSubmit} = form;
    const {colorPalette: {pageBackground, containerBackground, text, action1, red, green}} = useTheme();
    const [validateActionIsVisibleModal, setValidateActionIsVisibleModal] = useState<boolean>(false);
    return <View style={{flexDirection: 'column', backgroundColor: containerBackground, paddingTop: 10}}>
        <ValidateActionModalView
            title={translate('delete_operation_action')}
            description={translate('delete_operation_action_description')}
            action={onDeleteOperation!}
            close={()=>{setValidateActionIsVisibleModal(false)}}
            isVisible={validateActionIsVisibleModal}
        />
        <Controller
            control={control}
            name={"accountId"}
            render={({field}) => (
                <SelectForm
                    icon={Icons.walletOutline}
                    errorMessage={errors.accountId?.message}
                    label={translate('account')}
                    field={field}
                    placeholder={translate('select_corresponding_account')}
                    list={accounts}
                    notFoundMessage={translate('not_found_accounts')}
                    notFoundLinkName={translate('add_account')}
                    notFoundLinkAction={() => {
                        navigation.navigateByPath(HomeRoutes.accounts)
                    }}
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
                    label={translate('category')}
                    field={field}
                    placeholder={translate('operation_category_placeholder')}
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
                    label={translate('operation_type')}
                    field={field}
                    values={[
                        {id: IOperationTypeEnum.INCOME, label: translate('income'), color: Theme.green},
                        {id: IOperationTypeEnum.EXPENSE, label: translate('expense'), color: Theme.red},
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
                    label={translate('amount')}
                    field={field}
                    errorMessage={errors.amount?.message}
                    keyboardType={'numeric'}
                    placeholder={translate('amount_placeholder')}
                />
            )}
        />

        <Controller
            control={control}
            name={'date'}
            render={({field}) => (
                <InputDateForm
                    mode={'datetime'}
                    errorMessage={errors.date?.message}
                    label={translate('operation_date')}
                    field={field}
                    placeholder={translate('operation_date_placeholder')}
                />
            )}
        />

        <Controller
            control={control}
            name={'details'}
            render={({field}) => (
                <InputTextAreaForm
                    label={translate('description')}
                    field={field}
                    errorMessage={errors.details?.message}
                    placeholder={translate('operation_description_placeholder')}
                />
            )}
        />
        <VerticalSeparator percent={1}/>
        <ButtonForm 
            loading={loadingState}
            loadingLabel={isUpdate ? translate('pending_update_operation') : translate('pending_add_new_operation')}
            label={isUpdate ? translate('update_operation') : translate('add_new_operation')}
                    handleClick={handleSubmit(onSubmit)}/>
        {
            isUpdate && (
                <View style={{width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 15}}>
                    {
                        loadingState === LoadingState.pending
                            ? <ActivityIndicator color={red} size={IconSizes.medium}/>
                            : <TouchableOpacity onPress={() => {setValidateActionIsVisibleModal(true)}}>
                                <Text style={{
                                    fontSize: FontSize.normal,
                                    color: red,
                                    fontWeight: 'bold',
                                    borderBottomWidth: 1,
                                    borderBottomColor: red
                                }}>
                                    {translate('delete')}
                                </Text>
                            </TouchableOpacity>
                    }

                </View>
            )
        }

        <VerticalSeparator percent={10}/>
    </View>
};
export default AddOperationForm;