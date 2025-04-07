export interface PaginationOptions {
    page: number
    limit: number
  }
  
  export interface FilterOptions {
    [key: string]: any
  }
  
  export interface SortOptions {
    [key: string]: 1 | -1
  }
  
  export interface ApiResponse<T> {
    success: boolean
    data?: T
    message?: string
    error?: any
  }
  
  export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    count: number
    total: number
    totalPages: number
    currentPage: number
  }
  
  