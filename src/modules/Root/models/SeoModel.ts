import { BaseViewModel } from "@/_core/models/BaseViewModel";

export default class SeoModel extends BaseViewModel {
  meta_h1: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;

  public constructor(init?: Partial<SeoModel>) {
    super();
    Object.assign(this, init);
  }
}
