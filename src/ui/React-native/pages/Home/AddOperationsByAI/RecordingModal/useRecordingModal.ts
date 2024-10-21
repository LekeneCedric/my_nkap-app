import {MutableRefObject, useEffect, useMemo, useRef, useState} from "react";
import Voice from "@react-native-voice/voice";
import {useAppDispatch, useAppSelector} from "../../../../../../app/hook";
import {selectCategories} from "../../../../../../Feature/Category/CategorySelector";
import IProcessingOperationByAiCommand from "../../../../../../Feature/AIOperations/Thunks/ProcessingByAI/ProcessingByAICommand";
import ProcessingOperationByAIAsync from "../../../../../../Feature/AIOperations/Thunks/ProcessingByAI/ProcessingByAIAsync";
import {LoadingState} from "../../../../../../Domain/Enums/LoadingState";
import {selectLoadingStateProcessingByAIOperations} from "../../../../../../Feature/AIOperations/ProcessingByAISelector";
import useCustomTranslation from "../../../../Shared/Hooks/useCustomTranslation";
import moment from "moment";
import "moment/locale/fr";
import "moment/locale/en-gb";
import "moment/locale/de";
import { useToast } from "react-native-toast-notifications";
import { Languages } from "../../../../Shared/Constants/Languages";
import { selectUser } from "../../../../../../Feature/Authentication/AuthenticationSelector";
import { AITokenConsumed } from "../../../../../../Feature/Authentication/AuthenticationSlice";

interface useRecordingModalBehaviour {
  inputRef: MutableRefObject<any>;
  startRecording: () => void;
  stopRecording: () => void;
  recordingText: string;
  updateRecordingText: (text: string, notConcatenate?: boolean) => void;
  isRecording: boolean;
  openKeyboard: () => void;
  processingOperation: () => void;
  loading: LoadingState;
}

const useRecordingModal = (hide: () => void): useRecordingModalBehaviour => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUser)?.userId;
  const [recordingText, setRecordingText] = useState<string>("");
  const [isRecording, setIsRecording] = useState(false);
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectLoadingStateProcessingByAIOperations);
  const {currentLanguage, translate} = useCustomTranslation();
  const inputRef = useRef(null);
  const focusOnInputAndOpenKeyboard = () => {
    setTimeout(() => {
      //@ts-ignore
      inputRef.current?.blur();
      //@ts-ignore
      inputRef.current?.focus();
    }, 100);
  };

  const onSpeechStart = () => {
    setIsRecording(true);
  };

  const onSpeechEnd = () => {
    setIsRecording(false);
  };

  const onSpeechError = (error: any) => {
    stopRecording();
  };
  
  const onSpeechResults = (result: any) => {
    //@ts-ignore
    const newRecord = result.value[0];
    console.log("new-record", newRecord);
    updateRecordingText(newRecord);
  };

  const startRecording = async () => {
    try {
      await Voice.start(Languages.find(l => l.code == currentLanguage)!.vcode);
      setIsRecording(true);
    } catch (err) {
      console.log("start-err", err);
    }
  };

  const stopRecording = async () => {
    console.warn('stop-rec')
    try {
      Voice.destroy().then(Voice.removeAllListeners);
      await Voice.stop();
      await Voice.cancel();
      setIsRecording(false);
    } catch (err) {
      console.log("stop-err", err);
    }
  };

  const updateRecordingText = (
    text: string,
    notConcatenate: boolean = false,
  ) => {
    if (notConcatenate) {
      setRecordingText(text);
      return;
    }
    setRecordingText((prev: string) => `${prev} ${text}`);
  };

  const processingOperation = async () => {
    hide();
    const today = new Date();
    const command: IProcessingOperationByAiCommand = {
      userId: userId!,
      categories: categories.map(c => {
        return {id: c.id, label: c.name};
      }),
      currentDate: moment(today).format("YYYY-MM-DD HH:mm:ss"),
      message: recordingText,
      language: currentLanguage,
    };
    const response = await dispatch(ProcessingOperationByAIAsync(command));
    if (ProcessingOperationByAIAsync.fulfilled.match(response)) {
      setRecordingText("");
      const consumedToken = response.payload.consumedToken;
      dispatch(AITokenConsumed({consumedToken: consumedToken}));
    }
    if (ProcessingOperationByAIAsync.rejected.match(response)) {
      //@ts-ignore
      toast.show(translate(response.payload.message), {
        type: "danger",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
      });
    }
  };

  useEffect(() => {
    moment.locale(currentLanguage);
  }, []);
  
  useEffect(() => {
    if (inputRef.current) {
      //@ts-ignore
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Setup event listeners
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    return () => {
      // Cleanup event listeners
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return {
    inputRef: inputRef,
    openKeyboard: focusOnInputAndOpenKeyboard,
    recordingText: recordingText,
    updateRecordingText: updateRecordingText,
    isRecording: isRecording,
    startRecording: startRecording,
    stopRecording: stopRecording,
    processingOperation: processingOperation,
    loading: loading,
  };
};

export default useRecordingModal;
