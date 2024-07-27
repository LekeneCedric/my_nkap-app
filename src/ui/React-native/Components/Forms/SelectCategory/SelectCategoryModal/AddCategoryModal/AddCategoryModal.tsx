import {Modal, ScrollView, Text, TouchableOpacity, View} from "react-native";
import Animated, {BounceInDown, BounceInUp} from "react-native-reanimated";
import {Controller, UseFormReturn} from "react-hook-form";
import IAddCategoryForm from "../../../../../../../Infrastructure/Validators/Forms/Category/AddCategoryForm.ts";
import {InputForm} from "../../../Input/InputForm.tsx";
import {Icons} from "../../../../../Global/Icons.ts";
import InputTextAreaForm from "../../../InputTextArea/InputTextAreaForm.tsx";
import SelectIconForm from "../../../SelectIconForm/SelectIconForm.tsx";
import ButtonForm from "../../../Button/ButtonForm.tsx";
import {LoadingState} from "../../../../../../../Domain/Enums/LoadingState.ts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {IconSizes} from "../../../../../Global/IconSizes.ts";
import {FontSize} from "../../../../../Global/FontSize.ts";
import {useState} from "react";
import useTheme from "../../../../../Shared/Hooks/useTheme.ts";
import AddCategoryModalStyles from "./AddCategoryModal.styles.ts";
import SelectColorForm from "../../../SelectColorForm/SelectColorForm.tsx";
import {ColorsList} from "../../../../../Shared/Constants/Colors.ts";

type AddCategoryModalProps = {
    isVisible: boolean,
    form: UseFormReturn<IAddCategoryForm>,
    onSubmit: (data: IAddCategoryForm) => void,
    onClose: () => void,
    loading: LoadingState,
    defaultName: string,
}
const AddCategoryModal = ({isVisible, form, onSubmit, onClose, loading, defaultName}: AddCategoryModalProps) => {
    const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined)
    const colorsList = ColorsList;
    const {formState: {errors}, control, handleSubmit} = form;
    const {colorPalette: {pageBackground, containerBackground, text, red, action1, gray}} = useTheme();
    const styles = AddCategoryModalStyles(pageBackground, containerBackground, text, action1, gray);
    return <Modal transparent={true} style={styles.modalContainer} animationType={'slide'} visible={isVisible}>
        <ScrollView>
            <Animated.View entering={BounceInDown.duration(1000)} exiting={BounceInUp.duration(1000)}
                           style={styles.container}>
                <View style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row', position: 'relative', marginBottom: 10, alignItems: 'center'}}>
                        <TouchableOpacity onPress={onClose} style={{flex: 1, alignItems: 'flex-start', position: 'absolute', zIndex: 10000}}>
                            <Icon name={Icons.back} size={IconSizes.medium} color={text}/>
                        </TouchableOpacity>
                        <Text style={{
                            flex: 10,
                            top: 0,
                            width: '100%',
                            textAlign: 'center',
                            fontSize: FontSize.mediumHigh,
                            color: text,
                        }}>
                            Ajouter une Catégorie
                        </Text>
                    </View>
                    <Controller
                        control={control}
                        name={'name'}
                        render={({field}) => {
                            field.value = defaultName;
                            return (
                                <InputForm
                                    icon={Icons.category}
                                    errorMessage={errors.name?.message}
                                    label={'Nom'}
                                    field={field}
                                    keyboardType={'default'}
                                    placeholder={'Entrez le nom de la catégorie'}
                                />
                            )
                        }}
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
                                label={'Enregistrer'} handleClick={() => {handleSubmit(onSubmit)}}/>
                </View>
            </Animated.View>
        </ScrollView>
    </Modal>
};
export default AddCategoryModal;