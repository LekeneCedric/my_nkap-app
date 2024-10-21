import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useTheme from "../../../Shared/Hooks/useTheme";
import AddOperationByAIStyles from "./AddOperationsByAIStyles";
import RecordingModal from "./RecordingModal/RecordingModal";
import useAddOperationsByAI from "./useAddOpeartionsByAI";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../Global/Icons";
import {IconSizes} from "../../../Global/IconSizes";
import useCustomNavigation from "../../../utils/useNavigation";
import {useRef, useState} from "react";
import FloatingButton from "../../../Components/Buttons/FloatingButton/FloatingButton";
import {hp, wp} from "../../../Global/Percentage";
import OperationItem from "./Components/OperationItem";
import { LoadingState } from "../../../../../Domain/Enums/LoadingState";
import useCustomTranslation from "../../../Shared/Hooks/useCustomTranslation";
import { FontSize } from "../../../Global/FontSize";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Loading from "../../../Components/Loading/Loading";

const AddOperationByAI = () => {
  const {loading, operations, deleteOperation, addOperation, operationIsComplete, aiLeftToken} = useAddOperationsByAI();
  const [hideRecordingModal, setHideRecordingModal] = useState<boolean>(true);
  const triggerRecording = useRef(null);
  const triggetKeyboardActivation = useRef(null)
  const {
    colorPalette: {text, pageBackground, containerBackground, green, gray, action1, light, action1Text},
  } = useTheme();
  const {goBack} = useCustomNavigation();
  const {translate} = useCustomTranslation();
  const styles = AddOperationByAIStyles(pageBackground, text);
  const operationsIsLoading = loading === LoadingState.pending;
  const operationsIsEmpty = operations.length == 0;
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 4,
        }}>
        <TouchableOpacity onPress={goBack}>
          <Icon name={Icons.back} size={IconSizes.normMed} color={text} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: FontSize.normal, color: text}}>{translate('credits')} :</Text>
          <Text style={{color: action1, fontWeight: 'bold', marginLeft: 8}}>{aiLeftToken}</Text>
        </View>
        {
          ((!operationIsComplete || operationsIsEmpty) && !operationsIsLoading) && (
            <TouchableWithoutFeedback>
              <Icon
              name={Icons.circle.checked}
              size={IconSizes.medium}
              color={gray}
            />
            </TouchableWithoutFeedback>
          )
        }
        {(operationIsComplete && !operationsIsLoading && !operationsIsEmpty) && (
          <TouchableOpacity onPress={addOperation}>
            <Icon
              name={Icons.circle.checked}
              size={IconSizes.medium}
              color={green}
            />
          </TouchableOpacity>
        )}
        {
          operationsIsLoading && (
            <View>
              <Loading
              message=""
              color={action1}
              textColor={light}
            />
            </View>
          )
        }
      </View>
      <View style={{flex: 1, marginBottom: hideRecordingModal ? 0 : 250}}>
      {
        operations.length === 0 && (
          <View style={{marginTop: hp(25)}}>
            <Text style={{textAlign: 'center', color: text, fontSize: FontSize.normal}}>{translate('empty-operations')}</Text>
          </View>
        )
      }
      
      
      <FlatList
        data={operations}
        keyExtractor={item => item.uuid}
        renderItem={({item}) => (
          <OperationItem
            deleteOperation={()=>{
              deleteOperation(item.uuid);
            }}
            data={item}
          />
        )}
      />
      {
        hideRecordingModal && (
          <View style={{width: '100%', borderTopWidth: 0.5, borderTopColor: text, paddingTop: 15, paddingBottom: 15, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableWithoutFeedback  onPress={() => {
              setHideRecordingModal(false);
              if (triggetKeyboardActivation.current !== null) {
                //@ts-ignore
                triggetKeyboardActivation.current();
              }
            }} style={{
              borderWidth: 0.4, alignSelf: 'center', width: wp(70),
              borderColor: gray, flexDirection: 'row', borderRadius: 25, justifyContent: 'space-between',
              alignItems: 'center', marginBottom: 10,
              backgroundColor: containerBackground,
              padding: 2, paddingLeft: 10, position: 'relative'
              }}>
              <View>
                <Text style={{fontSize: FontSize.normal, color: text}}>
                  {translate('type-talk')}...
                </Text>
              </View>
              <View pointerEvents={'box-none'}>
                <TouchableWithoutFeedback onPress={()=>{
                  setHideRecordingModal(false);
                  if (triggerRecording.current !== null) {
                    //@ts-ignore
                    triggerRecording.current();
                  }
                }} >
                <TouchableOpacity style={{padding: 15, borderRadius: 25, backgroundColor: action1}}>
                  <Icon size={IconSizes.normMed} color={action1Text} name={Icons.recorder}/>
                </TouchableOpacity>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
            {/* <Text style={{fontSize: FontSize.normal, fontWeight: 'bold'}}>
              
            </Text> */}
          </View>
        )
      }
      
      </View>
      <RecordingModal
        isHide={hideRecordingModal}
        hide={() => setHideRecordingModal(true)}
        loadingState={loading}
        triggerRecording={(action: any) => {triggerRecording.current = action}}
        triggetKeyboardActivation={(action: any) => {triggetKeyboardActivation.current = action}}
      />
      {/* {hideRecordingModal && (
        <FloatingButton
          icon={Icons.recorder}
          extraIcon={Icons.ai}
          onPress={() => {
            setHideRecordingModal(false);
          }}
          customStyles={{bottom: hp(4)}}
        />
      )} */}
    </SafeAreaView>
  );
};
export default AddOperationByAI;
