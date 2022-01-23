import SeoModel from "@/_core/models/SeoModel";

export default class ProductModel extends SeoModel {
  public constructor(init?: Partial<ProductModel>) {
    super();
    Object.assign(this, init);
  }

  id: number;
  id_1c: string;
  barcode: number;
  vendor_code: string;
  count: number;
  name: string;
  price: number | null;
  unit: number;
  category: string;
  category_slug: string;
  volume: number;
  weight = 0;
  dimension: string;
  status: false;
  characteristic: string;
  full_description: string;
  composition: string;
  country: string;
  title: string;
  subtitle: string;
  banner: { url: string };
  logo: { url: string }[];
  video: { url: string };

  is_favorite = false;
}
