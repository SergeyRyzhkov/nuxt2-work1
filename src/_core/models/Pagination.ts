import { Expose } from "class-transformer";
import { BaseViewModel } from "./BaseViewModel";

export class Pagination extends BaseViewModel {
  total = 1;
  from = 1;
  to = 1;
  selectedPages: number[] = [];

  @Expose({ name: "per_page" })
  perPage = 12;

  @Expose({ name: "current_page" })
  currentPage = 0;

  @Expose({ name: "last_page" })
  lastPage = 0;

  static nextPage(pagination: Pagination) {
    if (pagination.selectedPages.length === 0 && !!pagination.currentPage) {
      pagination.selectedPages.push(pagination.currentPage);
    }
    pagination.currentPage = pagination.selectedPages.length > 0 ? Pagination.getLastSelectedPages(pagination) + 1 : 1;
    pagination.selectedPages.push(pagination.currentPage);
    return pagination;
  }

  static clearSelectedPages(pagination: Pagination) {
    pagination.selectedPages = [];
  }

  static getLastSelectedPages(pagination: Pagination) {
    return pagination.selectedPages.length ? pagination.selectedPages.slice(-1)[0] : 0;
  }

  static hasNextPage(pagination: Pagination) {
    const lastSelectedPage = Pagination.getLastSelectedPages(pagination);
    return lastSelectedPage === 0 || lastSelectedPage < (pagination.lastPage || Pagination.countPage(pagination));
  }

  static countPage(pagination: Pagination) {
    return pagination.perPage > 0 ? Math.ceil(pagination.total / pagination.perPage) : 0;
  }
}
