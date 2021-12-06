import { BaseViewModel } from "@/_core/models/BaseViewModel";

export default class _Model extends BaseViewModel {
  message?: string;

  originalUrl?: string;
  data?: any;
  headers?: any;
  status?: number;
  statusText?: string;
  method?: string;

  public constructor(init?: Partial<_Model>) {
    super();
    Object.assign(this, init);
  }
}
