export default interface ISaveCategoryCommand {
    userId: string,
    color: string,
    icon: string,
    name: string,
    description?: string,
    categoryId?: string,
}