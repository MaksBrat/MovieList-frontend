export class PagedList<T> {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    indexFrom: number;
    items: T[];
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }