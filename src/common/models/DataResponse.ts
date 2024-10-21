interface DataResponse<T = any> {
  message: string;
  status: number;
  data?: T;
}
export default DataResponse;
