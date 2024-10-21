interface PaginateResponse<T = any> {
  data?: T;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export default PaginateResponse;
