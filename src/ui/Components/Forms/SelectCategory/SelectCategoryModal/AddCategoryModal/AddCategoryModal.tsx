import {Modal, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "./AddCategoryModal.styles.ts";
import Animated, {BounceInDown, BounceInUp} from "react-native-reanimated";
import {Controller, UseFormReturn} from "react-hook-form";
import IAddCategoryForm from "../../../../../../Infrastructure/Validators/Forms/Category/AddCategoryForm.ts";
import {InputForm} from "../../../Input/InputForm.tsx";
import {Icons} from "../../../../../Global/Icons.ts";
import InputTextAreaForm from "../../../InputTextArea/InputTextAreaForm.tsx";
import SelectIconForm from "../../../SelectIconForm/SelectIconForm.tsx";
import ButtonForm from "../../../Button/ButtonForm.tsx";
import {LoadingState} from "../../../../../../Domain/Enums/LoadingState.ts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {IconSizes} from "../../../../../Global/IconSizes.ts";
import {Theme} from "../../../../../Global/Theme.ts";
import {FontSize} from "../../../../../Global/FontSize.ts";
import AllColors from "../../../../../../Infrastructure/Shared/Data/colors.ts";
import {useState} from "react";
import loading from "../../../../Loading/Loading.tsx";

type AddCategoryModalProps = {
    isVisible: boolean,
    form: UseFormReturn<IAddCategoryForm>,
    onSubmit: (data: IAddCategoryForm) => void,
    onClose: () => void,
    loading: LoadingState,
}
const AddCategoryModal = ({isVisible, form, onSubmit, onClose, loading}: AddCategoryModalProps) => {
    const [selectedColor, setSelectedColor] = useState<string | null>(null)
    const {formState: {errors}, control, handleSubmit} = form;
    return <Modal transparent={true} style={styles.modalContainer} animationType={'slide'} visible={isVisible}>
        <ScrollView>
            <Animated.View entering={BounceInDown.duration(1000)} exiting={BounceInUp.duration(1000)}
                           style={styles.container}>
                <View style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row', position: 'relative', marginBottom: 10, alignItems: 'center'}}>
                        <TouchableOpacity onPress={onClose} style={{flex: 1, alignItems: 'flex-start', position: 'absolute', zIndex: 10000}}>
                            <Icon name={Icons.back} size={IconSizes.medium} color={Theme.primary}/>
                        </TouchableOpacity>
                        <Text style={{
                            flex: 10,
                            top: 0,
                            width: '100%',
                            textAlign: 'center',
                            fontSize: FontSize.mediumHigh,
                            color: Theme.primary,
                        }}>
                            Ajouter une Catégorie
                        </Text>
                    </View>
                    <Controller
                        control={control}
                        name={'name'}
                        render={({field}) => (
                            <InputForm
                                icon={Icons.category}
                                errorMessage={errors.name?.message}
                                label={'Nom'}
                                field={field}
                                keyboardType={'default'}
                                placeholder={'Entrez le nom de la catégorie'}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name={'color'}
                        render={({field}) => (
                            <View style={styles.colorSelectContainer}>
                                <Text style={styles.colorSelectTitle}>Choisissez une couleur</Text>
                                <View style={styles.colorSelectIconsContainer}>
                                    {
                                        AllColors.map((color: string) => {
                                            const isSelectedColor = selectedColor === color;
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        field.onChange(color);
                                                        setSelectedColor(color)
                                                    }}
                                                    style={[styles.colorSelectIconsContainerItem, {
                                                        backgroundColor: color,
                                                        borderWidth: isSelectedColor ? 3 : 0.3,
                                                    }]}>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                    {errors.color?.message ? (
                                        <Text style={[styles.info, {color: Theme.red}]}>{errors.color?.message}</Text>
                                    ) : (
                                        <Text style={[styles.info, {color: Theme.gray}]}/>
                                    )}
                                </View>
                            </View>
                        )}
                    />
                    <Controller
                        control={control}
                        name={'icon'}
                        render={({field}) => (
                            <SelectIconForm
                                icon={Icons.icon}
                                errorMessage={errors.icon?.message}
                                label={'Icône'}
                                field={field}
                                placeholder={'Sélectionnez une icône'}
                                color={selectedColor}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name={'description'}
                        render={({field}) => (
                            <InputTextAreaForm
                                label={'Description'}
                                errorMessage={errors.description?.message}
                                field={field}
                                placeholder={'Entrez une description'}
                            />
                        )}
                    />
                    <ButtonForm loading={loading} loadingLabel={'Enregistrement de la catégorie ...'}
                                label={'Enregistrer'} handleClick={handleSubmit(onSubmit)}/>
                </View>
            </Animated.View>
        </ScrollView>
    </Modal>
};
export default AddCategoryModal;