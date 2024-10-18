import {
  FlatList,
  SafeAreaView,
  Text,
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
import {useState} from "react";
import FloatingButton from "../../../Components/Buttons/FloatingButton/FloatingButton";
import {hp} from "../../../Global/Percentage";
import OperationItem from "./Components/OperationItem";
import { LoadingState } from "../../../../../Domain/Enums/LoadingState";
import useCustomTranslation from "../../../Shared/Hooks/useCustomTranslation";
import { FontSize } from "../../../Global/FontSize";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Loading from "../../../Components/Loading/Loading";

const AddOperationByAI = () => {
  const {loading, operations, deleteOperation, addOperation, operationIsComplete, aiLeftToken} = useAddOperationsByAI();
  const [hideRecordingModal, setHideRecordingModal] = useState<boolean>(false);
  const {
    colorPalette: {text, pageBackground, green, gray, action1, light, action1Text},
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
          <Text style={{fontSize: FontSize.normal, color: action1}}>Tokens restants:</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', padding: 5, backgroundColor: action1, borderRadius: 10, marginLeft: 10}}>
            <Text style={{color: action1Text}}>{aiLeftToken}</Text>
          </View>
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
            <Loading
              addStyles={{position: "absolute", right: 10}}
              message=""
              color={action1}
              textColor={light}
            />
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
      </View>
      <RecordingModal
        isHide={hideRecordingModal || (aiLeftToken <= 0)}
        hide={() => setHideRecordingModal(true)}
        loadingState={loading}
      />
      {hideRecordingModal && (
        <FloatingButton
          icon={Icons.recorder}
          extraIcon={Icons.ai}
          onPress={() => {
            setHideRecordingModal(false);
          }}
          customStyles={{bottom: hp(4)}}
          deactivated={aiLeftToken <= 0}
        />
      )}
    </SafeAreaView>
  );
};
export default AddOperationByAI;
