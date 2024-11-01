//Match the properties that comes from the API
export interface MetaData {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
}

export class PaginatedResponse<T> {
    items: T;
    metaData: MetaData;

    constructor(items: T, metaData: MetaData) {
        this.items = items;
        this.metaData = metaData;
    }
}