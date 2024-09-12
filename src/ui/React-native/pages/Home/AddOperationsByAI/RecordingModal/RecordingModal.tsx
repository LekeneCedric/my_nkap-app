import {
  Animated,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import RecordingModalStyles from "./RecordingModalStyles";
import useTheme from "../../../../Shared/Hooks/useTheme";
import {TextInput} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../../Global/Icons";
import {IconSizes} from "../../../../Global/IconSizes";
import useCustomTranslation from "../../../../Shared/Hooks/useCustomTranslation";
import {hp} from "../../../../Global/Percentage";
import useRecordingAnimation from "./useRecordingAnimation";
import useRecordingModal from "./useRecordingModal";
import { useEffect } from "react";

type props = {
  onRecordSpeech: (text: string) => void,
  isHide: boolean,
  hide: () => void,
};
const RecordingModal = ({onRecordSpeech, isHide, hide}: props) => {
  const {
    recorderKeyboardIconScale,
    recorderCogOpacity,
    rotationRecorderCog1,
    rotationRecorderCog2,
    startAnimation,
    stopAnimation
  } = useRecordingAnimation();
  const {
    inputRef,
    startRecording,
    stopRecording,
    recordingText,
    updateRecordingText,
    isRecording,
    openKeyboard
  } = useRecordingModal();

  const {translate} = useCustomTranslation();
  const {
    colorPalette: {
      containerBackground,
      text,
      light,
      gray,
      placeholder: placeholderColor,
      action1,
      action1Container,
    },
    currentTheme
  } = useTheme();

  useEffect(() => {
    onRecordSpeech(recordingText);
  }, [recordingText])
  const styles = RecordingModalStyles({
    cardContainerColor: containerBackground,
    textColor: text,
  });

  useEffect(() => {
    console.log('rec', isRecording)
    if(!isRecording) {
      console.log('stop-recod')
      stopAnimation();
    }
  }, [isRecording])
  const activateKeyboard = () => {
    openKeyboard();
    stopRecording();
    stopAnimation();
  }

  const triggerRecording = () => {
    if (isRecording){
      stopRecording();
      stopAnimation();
      return;
    }
    startRecording();
    startAnimation();
  }
  
  return (
      isHide ? <></> : <View style={[styles.container]}>
        <View style={{flexDirection: "row", flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TextInput
              ref={inputRef}
              value={recordingText}
              keyboardType={"default"}
              placeholder={translate("type-talk")}
              placeholderTextColor={currentTheme == 'light' ? gray : placeholderColor}
              cursorColor={text}
              style={[styles.input, {alignSelf: "flex-start", color: text,}]}
              multiline={true}
              onChangeText={(text) => updateRecordingText(text, true)}
            />
          </ScrollView>

          <TouchableOpacity
            onPress={hide}
            style={{top: 10}}
          >
            <Icon
              name={Icons.reduce}
              size={IconSizes.normal}
              color={text}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 60,
            flexDirection: "row",
            position: "relative",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderRadius: 15,
              backgroundColor: action1Container,
              alignSelf: "center",
              flexDirection: "row",
            }}
          >
            {isRecording && (
              <Animated.View
                style={{
                  alignSelf: "center",
                  transform: [{scale: recorderKeyboardIconScale}],
                }}
              >
                <TouchableOpacity
                  disabled={!isRecording}
                  onPress={activateKeyboard}
                  style={{
                    marginRight: 10,
                    marginLeft: 10,
                    alignSelf: "center",
                  }}>
                  <Icon
                    style={{zIndex: 10}}
                    name={Icons.keyboard}
                    size={IconSizes.normMed}
                    color={action1}
                  />
                </TouchableOpacity>
              </Animated.View>
            )}
            <TouchableOpacity
              onPress={triggerRecording}
              style={{
                zIndex: 1,
                padding: 10,
                backgroundColor: action1Container,
                borderRadius: 15,
                alignSelf: "center",
              }}
            >
              <Animated.View
                style={{
                  zIndex: 3,
                  right: -3,
                  left: -3,
                  top: -3,
                  bottom: -3,
                  backgroundColor: action1,
                  borderRadius: 10,
                  alignSelf: "center",
                  position: "absolute",
                  transform: [{rotate: rotationRecorderCog1}],
                  opacity: recorderCogOpacity,
                }}
              />
              <Animated.View
                style={{
                  zIndex: 3,
                  right: -3,
                  left: -3,
                  top: -3,
                  bottom: -3,
                  backgroundColor: action1,
                  borderRadius: 10,
                  alignSelf: "center",
                  position: "absolute",
                  transform: [{rotate: rotationRecorderCog2}],
                  opacity: recorderCogOpacity,
                }}
              />
              <Icon
                style={{zIndex: 10}}
                name={Icons.recorder}
                size={IconSizes.normMed}
                color={isRecording ? light : action1}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            disabled={isRecording || recordingText.length == 0}
            style={{position: "absolute", right: 10}}
          >
            <Icon
              name={Icons.send}
              size={IconSizes.normal}
              color={isRecording || recordingText.length == 0 ? (currentTheme == 'light' ? gray : placeholderColor) : action1}
            />
          </TouchableOpacity>
        </View>
      </View>
  );
};

export default RecordingModal;
