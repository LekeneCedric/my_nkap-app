import {
  Animated,
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
import useRecordingAnimation from "./useRecordingAnimation";
import useRecordingModal from "./useRecordingModal";
import {useEffect} from "react";
import {LoadingState} from "../../../../../../Domain/Enums/LoadingState";
import Loading from "../../../../Components/Loading/Loading";
import React from "react";

type props = {
  isHide: boolean;
  hide: () => void;
  loadingState: LoadingState;
};
const RecordingModal = ({isHide, hide, loadingState}: props) => {
  const {
    recorderKeyboardIconScale,
    recorderCogOpacity,
    rotationRecorderCog1,
    rotationRecorderCog2,
    startAnimation,
    stopAnimation,
  } = useRecordingAnimation();
  const {
    inputRef,
    startRecording,
    stopRecording,
    recordingText,
    updateRecordingText,
    isRecording,
    openKeyboard,
    processingOperation,
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
    currentTheme,
  } = useTheme();

  const styles = RecordingModalStyles({
    cardContainerColor: containerBackground,
    textColor: text,
  });

  useEffect(() => {
    if (!isRecording) {
      stopAnimation();
    }
  }, [isRecording]);
  const activateKeyboard = () => {
    openKeyboard();
    stopRecording();
    stopAnimation();
  };

  const triggerRecording = () => {
    if (isRecording) {
      stopRecording();
      stopAnimation();
      return;
    }
    startRecording();
    startAnimation();
  };

  return isHide ? (
    <></>
  ) : (
    <View style={[styles.container]}>
      <View style={{flexDirection: "row", flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextInput
            ref={inputRef}
            value={recordingText}
            keyboardType={"default"}
            placeholder={translate("type-talk")}
            placeholderTextColor={
              currentTheme == "light" ? gray : placeholderColor
            }
            cursorColor={text}
            style={[styles.input, {alignSelf: "flex-start", color: text}]}
            multiline={true}
            onChangeText={text => updateRecordingText(text, true)}
          />
        </ScrollView>

        <TouchableOpacity onPress={hide} style={{top: 10}}>
          <Icon name={Icons.reduce} size={IconSizes.normal} color={text} />
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
            borderRadius: 100,
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
                }}
              >
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
            disabled={loadingState === LoadingState.pending}
            style={{
              zIndex: 1,
              padding: 10,
              backgroundColor: action1Container,
              borderRadius: 100,
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
            {loadingState === LoadingState.pending && (
              <Loading
                addStyles={{position: "absolute"}}
                message=""
                color={action1}
                textColor={light}
              />
            )}
            {loadingState !== LoadingState.pending && (
              <Icon
                style={{zIndex: 10}}
                name={Icons.recorder}
                size={IconSizes.normMed}
                color={isRecording ? light : action1}
              />
            )}
          </TouchableOpacity>
        </View>
        {loadingState === LoadingState.pending && (
          <Loading
            addStyles={{position: "absolute", right: 10}}
            message=""
            color={action1}
            textColor={light}
          />
        )}
        {loadingState !== LoadingState.pending && (
          <TouchableOpacity
            disabled={isRecording || recordingText.length == 0}
            style={{position: "absolute", right: 10}}
            onPress={() => {
              if (recordingText.length > 0) {
                processingOperation();
              }
            }}
          >
            <Icon
              name={Icons.send}
              size={IconSizes.normal}
              color={
                isRecording || recordingText.length == 0
                  ? currentTheme == "light"
                    ? gray
                    : placeholderColor
                  : action1
              }
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default RecordingModal;
