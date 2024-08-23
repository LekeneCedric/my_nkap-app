import {AddFinancialGoalsFormBehaviour} from "../useAddFinancialGoalsView.ts";
import {ActivityIndicator, Text, TouchableOpacity, View} from "react-native";
import useTheme from "../../../../Shared/Hooks/useTheme.ts";
import InputDateForm from "../../../../Components/Forms/InputBirthDate/InputBirthDateForm.tsx";
import {Controller} from "react-hook-form";
import {InputForm} from "../../../../Components/Forms/Input/InputForm.tsx";
import {Icons} from "../../../../Global/Icons.ts";
import VerticalSeparator from "../../../../Components/Shared/VerticalSeparator/VerticalSeparator.tsx";
import ButtonForm from "../../../../Components/Forms/Button/ButtonForm.tsx";
import {hp} from "../../../../Global/Percentage.ts";
import ISelectItem from "../../../../Components/Forms/Select/SelectItem.ts";
import SelectForm from "../../../../Components/Forms/Select/SelectForm.tsx";
import {LoadingState} from "../../../../../../Domain/Enums/LoadingState.ts";
import {IconSizes} from "../../../../Global/IconSizes.ts";
import {FontSize} from "../../../../Global/FontSize.ts";
import ValidateActionModalView from "../../../../Components/Modals/ValidateActionModal/ValidateActionModalView.tsx";
import {useState} from "react";
import InputTextAreaForm from "../../../../Components/Forms/InputTextArea/InputTextAreaForm.tsx";
import useCustomTranslation from "../../../../Shared/Hooks/useCustomTranslation.ts";

type props = {
    addFinancialGoalsFormBehaviour: AddFinancialGoalsFormBehaviour,
    accounts: ISelectItem[],
    isUpdate? : boolean,
    onDeleteFinancialGoal?: () => void,
}
const AddFinancialGoalsForm = ({addFinancialGoalsFormBehaviour, accounts, isUpdate, onDeleteFinancialGoal}: props) => {
    const {translate} = useCustomTranslation();
    const {form, onSubmit, loadingState} = addFinancialGoalsFormBehaviour;
    const {formState: {errors}, control, handleSubmit} = form;
    const {colorPalette: {containerBackground, red}} = useTheme();
    const [validateActionIsVisibleModal, setValidateActionIsVisibleModal] = useState(false);
    return (
        <>
            <ValidateActionModalView
                title={translate('delete_financial_goal_action')}
                description={translate('delete_financial_goal_action_description')}
                action={onDeleteFinancialGoal!}
                close={()=>{setValidateActionIsVisibleModal(false)}}
                isVisible={validateActionIsVisibleModal}
            />
            <View style={{flexDirection: 'column', backgroundColor: containerBackground, paddingTop: 15, height: hp(100)}}>
                <Controller
                    control={control}
                    name={'details'}
                    render={({field}) => (
                        <InputTextAreaForm
                            label={translate('financial_goal_title')}
                            field={field}
                            errorMessage={errors.details?.message}
                            placeholder={translate('financial_goal_title_placeholder')}
                        />
                    )}
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
                        />
                    )}
                />
                <Controller
                    control={control}
                    name={'startDate'}
                    render={({field}) => (
                        <InputDateForm
                            mode={'date'}
                            errorMessage={errors.startDate?.message}
                            label={translate('start_date')}
                            field={field}
                            placeholder={translate('start_date_placeholder')}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name={'endDate'}
                    render={({field}) => (
                        <InputDateForm
                            mode={'date'}
                            errorMessage={errors.startDate?.message}
                            label={translate('end_date')}
                            field={field}
                            placeholder={translate('end_date_placeholder')}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name={'desiredAmount'}
                    render={({field}) => (
                        <InputForm
                            type={'amount'}
                            icon={Icons.wallet}
                            label={translate('desired_amount')}
                            field={field}
                            errorMessage={errors.desiredAmount?.message}
                            keyboardType={'numeric'}
                            placeholder={translate('desired_amount_placeholder')}
                        />
                    )}
                />
                <VerticalSeparator percent={1}/>
                <ButtonForm loading={loadingState} loadingLabel={translate('pending_add_new_financial_goal')} label={translate('add_new_financial_goal')}
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
            </View>
        </>
    )
};
export default AddFinancialGoalsForm;