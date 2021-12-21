import SeoModel from "@/_core/models/SeoModel";

export default class CategoryModel extends SeoModel {
  public constructor(init?: Partial<CategoryModel>) {
    super();
    Object.assign(this, init);
  }

  id: number;
  title: string;
  subtitle: string;
  order: number;
  parent_id: null;
  // eslint-disable-next-line no-use-before-define
  subcategory: CategoryModel[];
  logo: { url: string };
  banner: { url: string };
  // eslint-disable-next-line no-use-before-define
  parent: CategoryModel;

  isOpened = false;
}
