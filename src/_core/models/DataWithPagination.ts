import { Pagination } from "./Pagination";

export class DataWithPagination<T> {
  data: T[] = [];
  status = 0;
  statusText = "";
  pagination = new Pagination();
  seo: { [key: string]: string } = {};
}
