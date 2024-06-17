import {IOperationTypeEnum} from "../../../Domain/Operation/Operation.ts";

type FilterOperationCommand = {
    userId?: string,
    accountId?: string,
    date?: string,
    categoryId?: string,
    type?: IOperationTypeEnum,
    page?: number,
    limit?: number,
}
export default class FilterOperationCommandBuilder {
    #command: FilterOperationCommand = {}
    static asCommand() {
        return new FilterOperationCommandBuilder();
    }

    withPage(page: number) {
        this.#command.page = page;
        return this;
    }

    withLimit(limit: number) {
        this.#command.limit = limit;
        return this;
    }

    withUserId(userId: string) {
        this.#command.userId = userId;
        return this;
    }

    withDate(date: string | undefined) {
        this.#command.date = date;
        return this;
    }

    withCategoryId(categoryId: string | undefined) {
        this.#command.categoryId = categoryId;
        return this;
    }

    withType(type: IOperationTypeEnum | undefined) {
        this.#command.type = type;
        return this;
    }

    build() {
        return this.#command;
    }
}