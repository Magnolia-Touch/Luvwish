import { PaginationDto } from './pagination.dto';
export declare class SearchFilterDto extends PaginationDto {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
}
