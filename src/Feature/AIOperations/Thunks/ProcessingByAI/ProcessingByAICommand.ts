type category = {
    id: string,
    label: string
}
export default interface IProcessingOperationByAiCommand {
    userId: string,
    categories: category[],
    currentDate: string,
    message: string,
    language: string
}