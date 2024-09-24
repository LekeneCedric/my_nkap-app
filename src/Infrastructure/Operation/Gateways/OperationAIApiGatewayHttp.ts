import IOperationAIApiGateway from "../../../Domain/Operation/OperationAIApiGateway";
import IProcessingOperationByAiCommand from "../../../Feature/AIOperations/Thunks/ProcessingByAI/ProcessingByAICommand";
import IProcessingOperationByAIResponse from "../../../Feature/AIOperations/Thunks/ProcessingByAI/ProcessingByAIResponse";
import {ApiRoutes} from "../../Api/routes";
import {HttpProvider} from "../../Shared/Gateways/Axios/HttpProvider";
import parseGeminiApiResposne from "../../Utils/ParseGeminiApiResponse";
import ProcessingOperationByAIResponseFactory from "../Factories/ProcessingOperationByAIResponseFactory";
import {GOOGLE_GEMINI_API_KEY} from '@env';

export default class OperationAIApiGatewayHttp
  extends HttpProvider
  implements IOperationAIApiGateway
{
  async processingOperationByAI(
    command: IProcessingOperationByAiCommand,
  ): Promise<IProcessingOperationByAIResponse> {
    let result: any;
    const commandData = {
      
      contents: {
        parts: [
          {
            text: `
              You are an AI assistant helping with financial management. I will provide you with the following information:
              - A table of user action categories in the form of { id, label } (e.g., { 1, "Food" }, { 2, "Transport" }, etc.)
              - The current date and time in the format "YYYY-MM-DD HH:mm:ss"
              - A user message describing the financial activity they conducted.
              - Your task is to analyze the message, identify the type of operation (INCOME=1, EXPENSE=2), the amount involved, the relevant category based on the label, and return a structured table of operations in the following
              format : {
                  type: TYPE(INCOME=1, EXPENSE=2),
                  amount: number,
                  categoryId: string,
                  date: string('YYYY-MM-DD HH:mm:ss'),
                  title: string(title of the operation)
                }
                Example Input:
                Categories: [{ 1, "Food" }, { 2, "Transport" }]
                Date: '2024-09-20 10:15:00'
                Message: "I spent 50 dollars on groceries."
                Expected Output:
                {
                  [
                    {
                      type: 2,
                      amount: 50,
                      categoryId: "1",
                      date: '2024-09-20 10:15:00',
                      title: "Groceries"
                    },
                  ]
                }
                Your response must be JSON containing list of operations based on message provided and making string utf-8 encoded.
            `,
          },
          {
            text: `
             list of given categories : (
              ${command.categories.map(
                ca => `{ id: ${ca.id}, label: ${ca.label}}`,
              )})
            `,
          },
          {
            text: `Today is : ${command.currentDate}`,
          },
          {
            text: command.message,
          },
        ],
      },
      "generationConfig": {
        "temperature": 0.0,
        "response_mime_type":"application/json",
      },
    };
    try {
      const response = await this.postByOverrideBearer(
        `${ApiRoutes.gemini}?key=${GOOGLE_GEMINI_API_KEY}`,
        commandData,
      );
      //@ts-ignore
      let output = response.data;
      result = parseGeminiApiResposne(output);
      console.warn(`api: ${GOOGLE_GEMINI_API_KEY}`)
    } catch (e: any) {
      console.log(e);
      throw new Error("something-went-wrong-model");
    }
    return ProcessingOperationByAIResponseFactory.buildFromApiResponse(result);
  } 
}
