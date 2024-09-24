
const parseGeminiApiResposne = (apiResponse: any) => {
    try {
        let apiTextResponse: string = apiResponse.candidates[0].content.parts[0].text;
        console.log('api-test-rep');
        console.log(apiTextResponse);
        const cleanedResponse = apiTextResponse.trim();
        const parsedData =  parseJsonWithRetry(cleanedResponse);
        console.log('parsed-data');
        console.log(parsedData);
        return parsedData;
    } catch (error) {
        return null;
    }
};

const parseJsonWithRetry = (response: string, maxRetries: number = 10) => {
    let retries = 0;
    let parsedData = null;

    while (retries < maxRetries) {
        try {
            parsedData = JSON.parse(response);
            return parsedData;
        } catch(error) {
            retries++;
            console.log(`attempt parse ${retries} times`);
        }
    }
    return null;
};

export default parseGeminiApiResposne;