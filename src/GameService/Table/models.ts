export interface GetTableItemsOptions {
    skip: number | undefined,
    limit: number | undefined,
    find: [string, number | boolean | string] | undefined,
    rowsOwner: string | undefined,
    sort: [string, "ASC" | "DESC"] | undefined,

}