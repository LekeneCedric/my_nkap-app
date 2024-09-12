import {MutableRefObject, useEffect, useRef, useState} from "react";
import Voice from "@react-native-voice/voice";

interface useRecordingModalBehaviour {
  inputRef: MutableRefObject<any>,
  startRecording: () => void,
  stopRecording: () => void,
  recordingText: string,
  updateRecordingText: (text: string, notConcatenate?: boolean) => void,
  isRecording: boolean,
  openKeyboard: () => void,
}

const useRecordingModal = (): useRecordingModalBehaviour => {
  const [recordingText, setRecordingText] = useState<string>("");
  const [isRecording, setIsRecording] = useState(false);
  
  const inputRef = useRef(null);
  const focusOnInputAndOpenKeyboard = () => {
    setTimeout(() => {
      //@ts-ignore
      inputRef.current?.blur();
      //@ts-ignore
      inputRef.current?.focus();
    }, 100);
  };


  Voice.onSpeechStart = () => {
    setIsRecording(true);
  };
  Voice.onSpeechEnd = () => {
    stopRecording();
  };

  Voice.onSpeechResults = result => {
    //@ts-ignore
    const newRecord = result.value[0];
    console.log("new-record");
    updateRecordingText(newRecord);
  };

  const startRecording = async () => {
    try {
      await Voice.start("fr-FR");
      setIsRecording(true);
    } catch (err) {
      console.log("start-err", err);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (err) {
      console.log("stop-err", err);
    }
  };

  const updateRecordingText = (text: string, notConcatenate: boolean = false) => {
    if (notConcatenate) {
      setRecordingText(text);
      return;
    }
    setRecordingText((prev: string) => `${prev} ${text}`);
  };

  useEffect(() => {
    if (inputRef.current) {
      //@ts-ignore
      inputRef.current.focus();
    }
  }, []);

  return {
    inputRef: inputRef,
    openKeyboard: focusOnInputAndOpenKeyboard,
    recordingText: recordingText,
    updateRecordingText: updateRecordingText,
    isRecording: isRecording,
    startRecording: startRecording,
    stopRecording: stopRecording,
  };
};

export default useRecordingModal;
