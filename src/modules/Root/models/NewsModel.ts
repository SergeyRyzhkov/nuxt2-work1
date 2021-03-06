import SeoModel from "@/_core/models/SeoModel";

export default class NewsModel extends SeoModel {
  id: number;
  title: string;
  text: string;
  logo: { url: string };
  banner: { url: string };
  published_at: string;
  views_count = 10;

  public constructor(init?: Partial<NewsModel>) {
    super();
    Object.assign(this, init);
  }
}
