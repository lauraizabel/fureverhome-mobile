export interface QueryPagination {
  page?: number;
  take?: number;
  order?: 'ASC' | 'DESC';
}

export interface PageMeta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface Page<T> {
  data: T[];
  meta: PageMeta;
}
