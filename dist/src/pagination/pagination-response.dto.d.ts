export declare class PaginationResponseDto<T> {
    data: T[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    constructor(data: T[], total: number, page: number, limit: number);
}
