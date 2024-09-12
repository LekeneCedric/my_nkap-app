import { useState } from "react";

interface useAddOperationsByAIBehaviour {
    updateRecordSpeech: (speech: string) => void,
}
const useAddOperationsByAI = (): useAddOperationsByAIBehaviour => {
    const [recordSpeech, setRecordSpeech] = useState('');
    const updateRecordSpeech = (speech: string) => {
        setRecordSpeech(speech);
    }

    return {
        updateRecordSpeech: updateRecordSpeech,
    };
};

export default useAddOperationsByAI;