import {IOperationTypeEnum} from "../../../Domain/Operation/Operation.ts";

type FilterOperationCommand = {
    userId?: string,
    month?: number,
    year?: number,
    accountId?: string,
    date?: string,
    categoryId?: string,
    operationType?: IOperationTypeEnum,
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
        if (!this.#command.month) {
            this.#command.date = date;
        }
        return this;
    }

    withCategoryId(categoryId: string | undefined) {
        this.#command.categoryId = categoryId;
        return this;
    }

    withOperationType(type: IOperationTypeEnum | undefined) {
        this.#command.operationType = type;
        return this;
    }

    withMonth(month: number | undefined) {
        this.#command.date = undefined;
        this.#command.month = month;
        return this;
    }

    withYear(year: number | undefined) {
        this.#command.year = year;
        return this;
    }

    build() {
        return this.#command;
    }
}