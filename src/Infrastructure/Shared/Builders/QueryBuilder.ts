export default class QueryBuilder {
    static fromCommand(command: object): string {
        let query = '';
        Object.entries(command).map(([key, value]) => {
            let isFirstParam = query.length == 0;
            let sign = isFirstParam ? '?': '&';
            query += `${sign}${key}=${value}`;
        });
        return query;
    }
}