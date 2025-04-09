// ======================================
//            API TYPES
// ======================================

/**
 * Pagination configuration options
 */
export interface PaginationOptions {
  page: number;
  limit: number;
}

/**
 * Generic filter options (key-value pairs)
 */
export interface FilterOptions {
  [key: string]: any;
}

/**
 * Sorting configuration (1 for ascending, -1 for descending)
 */
export interface SortOptions {
  [key: string]: 1 | -1;
}

/**
 * Base API response structure
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: any;
}

/**
 * Paginated API response structure
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  count: number;
  total: number;
  totalPages: number;
  currentPage: number;
}