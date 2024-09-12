import {SafeAreaView, TouchableOpacity, View} from "react-native";
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

const AddOperationByAI = () => {
  const [hideRecordingModal, setHideRecordingModal] = useState<boolean>(false);
  const {
    colorPalette: {text, pageBackground},
  } = useTheme();
  const {goBack} = useCustomNavigation();
  const {updateRecordSpeech} = useAddOperationsByAI();

  const styles = AddOperationByAIStyles(pageBackground, text);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity onPress={goBack}>
          <Icon name={Icons.back} size={IconSizes.normMed} color={text} />
        </TouchableOpacity>
      </View>
      <RecordingModal
        onRecordSpeech={updateRecordSpeech}
        isHide={hideRecordingModal}
        hide={() => setHideRecordingModal(true)}
      />
      {hideRecordingModal && (
        <FloatingButton
          icon={Icons.recorder}
          extraIcon={Icons.ai}
          onPress={() => setHideRecordingModal(false)}
          customStyles={{bottom: hp(4)}}
        />
      )}
    </SafeAreaView>
  );
};
export default AddOperationByAI;
