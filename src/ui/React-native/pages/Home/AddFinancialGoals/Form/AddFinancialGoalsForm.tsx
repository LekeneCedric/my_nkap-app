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

type props = {
    addFinancialGoalsFormBehaviour: AddFinancialGoalsFormBehaviour,
    accounts: ISelectItem[],
    isUpdate? : boolean,
    onDeleteFinancialGoal?: () => void,
}
const AddFinancialGoalsForm = ({addFinancialGoalsFormBehaviour, accounts, isUpdate, onDeleteFinancialGoal}: props) => {
    const {form, onSubmit, loadingState} = addFinancialGoalsFormBehaviour;
    const {formState: {errors}, control, handleSubmit} = form;
    const {colorPalette: {containerBackground, red}} = useTheme();
    const [validateActionIsVisibleModal, setValidateActionIsVisibleModal] = useState(false);
    return (
        <>
            <ValidateActionModalView
                title={'Suppréssion'}
                description={'La suppréssion de cet objectif est irreversible \n Continuer ?'}
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
                            label={'Titre'}
                            field={field}
                            errorMessage={errors.details?.message}
                            placeholder={'Titre'}
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
                            label={'Compte'}
                            field={field}
                            placeholder={'Sélectionnez le compte correspondant'}
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
                            label={'Date de début'}
                            field={field}
                            placeholder={'Sélectionnez la date de début'}
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
                            label={'Date de fin'}
                            field={field}
                            placeholder={'Sélectionnez la date de fin'}
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
                            label={'Montant désiré'}
                            field={field}
                            errorMessage={errors.desiredAmount?.message}
                            keyboardType={'numeric'}
                            placeholder={'Entrez le montant désiré '}
                        />
                    )}
                />
                <VerticalSeparator percent={1}/>
                <ButtonForm loading={loadingState} loadingLabel={'Enregistrement ...'} label={'Enregistrer'}
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
                                            Supprimer
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