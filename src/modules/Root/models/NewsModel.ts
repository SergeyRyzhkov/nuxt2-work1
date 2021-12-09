import { BaseViewModel } from "@/_core/models/BaseViewModel";

export default class NewsModel extends BaseViewModel {
  id: number;
  title: string;
  text: string;
  logo: { url: string };
  published_at: string;
  views_count = 10;

  public constructor(init?: Partial<NewsModel>) {
    super();
    Object.assign(this, init);
  }
}
