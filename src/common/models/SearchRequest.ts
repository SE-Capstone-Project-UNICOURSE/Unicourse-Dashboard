interface OrderBy {
  [key: string]: 'asc' | 'desc';
}

interface SearchRequest {
  page: number;
  limit: number;
  filterBy?: FilterBy;
  orderBy?: OrderBy;
}

interface FilterCondition {
  equals?: string | number | boolean;
  notEquals?: string | number | boolean;
  in?: (string | number | boolean)[];
  notIn?: (string | number | boolean)[];
  greaterThan?: number;
  lessThan?: number;
  greaterThanOrEqual?: number;
  lessThanOrEqual?: number;
}

interface FilterBy {
  [key: string]: FilterCondition | undefined;
}

export default SearchRequest;
