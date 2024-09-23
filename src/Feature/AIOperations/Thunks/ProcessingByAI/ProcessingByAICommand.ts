type category = {
    id: string,
    label: string
}
export default interface IProcessingOperationByAiCommand {
    categories: category[],
    currentDate: string,
    message: string,
    language: string
}