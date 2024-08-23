import {AddAccountFormBehaviour} from "../Modals/AddAccountModal/useAddAccountModalView.ts";
import useTheme from "../../../../../Shared/Hooks/useTheme.ts";
import {useMemo, useState} from "react";
import {ActivityIndicator, Text, TouchableOpacity, View} from "react-native";
import {Controller} from "react-hook-form";
import {InputForm} from "../../../../../Components/Forms/Input/InputForm.tsx";
import {Icons} from "../../../../../Global/Icons.ts";
import SelectIconForm from "../../../../../Components/Forms/SelectIconForm/SelectIconForm.tsx";
import SelectColorForm from "../../../../../Components/Forms/SelectColorForm/SelectColorForm.tsx";
import ButtonForm from "../../../../../Components/Forms/Button/ButtonForm.tsx";
import CheckedForm from "../../../../../Components/Forms/Checked/CheckedForm.tsx";
import {Theme} from "../../../../../Global/Theme.ts";
import IAccount from "../../../../../../../Domain/Account/Account.ts";
import {LoadingState} from "../../../../../../../Domain/Enums/LoadingState.ts";
import {IconSizes} from "../../../../../Global/IconSizes.ts";
import {FontSize} from "../../../../../Global/FontSize.ts";
import ValidateActionModalView from "../../../../../Components/Modals/ValidateActionModal/ValidateActionModalView.tsx";
import {ColorsList} from "../../../../../Shared/Constants/Colors.ts";
import useCustomTranslation from "../../../../../Shared/Hooks/useCustomTranslation.ts";

type props = {
    addAccountFormBehaviour: AddAccountFormBehaviour,
    isUpdate?: boolean,
    account?: IAccount,
    onDeleteAccount?: () => void,
}
const AddAccountForm = ({addAccountFormBehaviour, isUpdate, account, onDeleteAccount}: props) => {
    const {translate} = useCustomTranslation();
    const {form, onSubmit, loadingState} = addAccountFormBehaviour;
    const {formState: {errors}, control, handleSubmit} = form;
    const {colorPalette: {pageBackground, containerBackground, text, action1, red, green, gray}} = useTheme();
    const [selectedColor, setSelectedColor] = useState<string|undefined>(undefined);
    const [validateActionIsVisibleModal, setValidateActionIsVisibleModal] = useState<boolean>(false);
    const colorsList = useMemo(() => ColorsList, []);

    return <View style={{flexDirection: 'column', backgroundColor: containerBackground, paddingTop: 10}}>
        <ValidateActionModalView
            title={translate('delete_account_action')}
            description={translate('delete_account_action_description')}
            action={onDeleteAccount!}
            close={()=>{setValidateActionIsVisibleModal(false)}}
            isVisible={validateActionIsVisibleModal}
        />
        <Controller
            control={control}
            name={'name'}
            render={({field}) => (
                <InputForm
                    icon={Icons.walletOutline}
                    label={translate('account_name')}
                    field={field}
                    keyboardType={'default'}
                    placeholder={translate('account_name_placeholder')}
                    errorMessage={errors.name?.message}
                />
            )}
        />
        <Controller
            control={control}
            name={'type'}
            render={({field}) => (
                <InputForm
                    icon={Icons.walletOutline}
                    label={translate('account_type')}
                    field={field}
                    keyboardType={'default'}
                    placeholder={translate('account_type_placeholder')}
                    errorMessage={errors.type?.message}
                />
            )}
        />
        {
            !isUpdate &&  <Controller
                control={control}
                name={'balance'}
                render={({field}) => (
                    <InputForm
                        type={'amount'}
                        icon={Icons.wallet}
                        label={translate('amount')}
                        field={field}
                        errorMessage={errors.balance?.message}
                        keyboardType={'numeric'}
                        placeholder={translate('amount_placeholder')}
                    />
                )}
            />
        }


        <Controller
            control={control}
            name={'isIncludeInTotalBalance'}
            render={({field}) => (
                <CheckedForm
                    errorMessage={errors.isIncludeInTotalBalance?.message}
                    label={translate('include_in_total_balance')}
                    field={field}
                    values={[
                        {id: false, label: translate('no'), color: Theme.gray},
                        {id: true, label: translate('yes'), color: green},
                    ]}
                />
            )}
        />

        <Controller
            control={control}
            name={'color'}
            render={({field}) => (
                <SelectColorForm
                    colors={colorsList}
                    errorMessages={errors.color?.message}
                    currentSelectedColor={selectedColor}
                    field={field}
                    setSelectedColor={(selectedColor: string) => setSelectedColor(selectedColor)}
                />
            )}
        />

        <Controller
            control={control}
            name={'icon'}
            render={({field}) => (
                <SelectIconForm
                    icon={Icons.icon}
                    errorMessage={errors.icon?.message}
                    label={translate('icon')}
                    field={field}
                    placeholder={translate('select_icon')}
                    color={selectedColor}
                />
            )}
        />

        <ButtonForm
            loading={loadingState}
            loadingLabel={!isUpdate ? translate('pending_create_account') : translate('pending_update_account')}
            label={!isUpdate ? translate('create_new_account') : translate('update_account')}
            handleClick={handleSubmit(onSubmit)}
        />
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
    </View>
};
export default AddAccountForm;