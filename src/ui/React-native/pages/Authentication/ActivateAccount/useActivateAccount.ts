import { MutableRefObject, useEffect, useRef, useState } from "react";
import { TextInput } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../../app/hook";
import { selectActivationAccountEmail, selectActivationAccountExpirationTime, selectActivationAccountLoadingState, selectAuthenticationLoadingState } from "../../../../../Feature/Authentication/AuthenticationSelector";
import { LoadingState } from "../../../../../Domain/Enums/LoadingState";
import IVerificationAccountCommand from "../../../../../Feature/Authentication/Thunks/VerificationAccount/VerificationAccountCommand";
import VerificationAccountAsync from "../../../../../Feature/Authentication/Thunks/VerificationAccount/VerificationAccountAsync";
import useUtils from "../../../utils/useUtils";
import { DeactivateUserStatus } from "../../../../../Feature/Authentication/AuthenticationSlice";
import useCustomTranslation from "../../../Shared/Hooks/useCustomTranslation";

interface behaviour {
    inputRefs: MutableRefObject<TextInput|null>[],
    updateCode: (value: string, pos: number) => void,
    code: string[],
    handleFocus: (pos: number) => void,
    backToPreviousInput: (pos: number) => void,
    loadingState: LoadingState,
    pending: boolean,
    failed: boolean,
    success: boolean,
    formattedLeftTime: string,
    email: string,
}
const useActivateAccount = (): behaviour => {
    const dispatch = useAppDispatch();
    const {formatTimeToMMSS} = useUtils();
    const inputRef1 = useRef<TextInput|null>(null);
    const inputRef2 = useRef<TextInput|null>(null);
    const inputRef3 = useRef<TextInput|null>(null);
    const inputRef4 = useRef<TextInput|null>(null);
    const inputRef5 = useRef<TextInput|null>(null);
    const inputRef6 = useRef<TextInput|null>(null);
    const inputRefs = [inputRef1, inputRef2, inputRef3, inputRef4, inputRef5, inputRef6];
    const [code, setCode] = useState<string[]>(['','','','','','']);
    const expirationTime = useAppSelector(selectActivationAccountExpirationTime);
    const [timeLeft, setTimeLeft] = useState<number>(10);
    const loadingState = useAppSelector(selectActivationAccountLoadingState);
    const activationAccountEmail = useAppSelector(selectActivationAccountEmail);

    const failed = loadingState === LoadingState.failed;
    const pending = loadingState === LoadingState.pending;
    const success = loadingState === LoadingState.success;

    const handleFocus = (pos: number) => {
        //@ts-ignore :(
        const inputValue = inputRefs[pos]?.current?._lastNativeText || '';
        inputRefs[pos]?.current?.setNativeProps({ selection: { start: inputValue.length, end: inputValue.length } });
    }
    
    const updateCode = (value: string, pos: number) => {
        let codeTemp = [...code];
        codeTemp[pos] = value.replace(codeTemp[pos], '');
        setCode(codeTemp);
        if (pos <= 4 && value.length > 0) {
            focusOnInput(pos + 1);
        }
    }

    const backToPreviousInput = (pos: number) => {
        if (pos > 0) {
            focusOnInput(pos - 1);
        }
    }

    const focusOnInput = (pos: number) => {
        setTimeout(()=>{
            inputRefs[pos].current?.blur();
            inputRefs[pos].current?.focus();
        }, 100);
    }

    const checkIfAllCodeDigitIsEntered = () => {
        let allDigitIsEntered = true;
        code.map(digit => {
            if (digit.length === 0)
                allDigitIsEntered = false;
        })
        return allDigitIsEntered;
    }

    const submitVerificationCode = async () => {
        const verificationCode = code.reduce((acc: string, currDigt: string) => {
            return acc + currDigt;
        }, '')
        const command = {
            code: verificationCode,
            email: activationAccountEmail,
        } as IVerificationAccountCommand
        await dispatch(VerificationAccountAsync(command));
    }

    const deactivateUserStatus = () => {
        dispatch(DeactivateUserStatus());
    }

    useEffect(() => {
        focusOnInput(0);
        const tenMinutesInSeconds = 600;
        const interval = setInterval(() => {
            setTimeLeft(
                tenMinutesInSeconds - Math.floor((new Date().getTime() - expirationTime)/1000)
            )
        }, 1000);

        return () => clearInterval(interval);
    }, [])
    
    useEffect(() => {
        if (timeLeft <= 0) {
            deactivateUserStatus();
        }
    }, [timeLeft]);
    useEffect(() => {
        const allCodeDigitIsEnter = checkIfAllCodeDigitIsEntered();
        if (allCodeDigitIsEnter) {
            submitVerificationCode();
        }
    }, [code])
    return {
        inputRefs: inputRefs,
        updateCode: updateCode,
        code: code,
        handleFocus: handleFocus,
        backToPreviousInput: backToPreviousInput,
        loadingState: loadingState,
        failed: failed,
        pending: pending,
        success: success,
        formattedLeftTime: formatTimeToMMSS(timeLeft),
        email: activationAccountEmail
    };
};

export default useActivateAccount;