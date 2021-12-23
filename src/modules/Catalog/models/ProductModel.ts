import SeoModel from "@/_core/models/SeoModel";

export default class ProductModel extends SeoModel {
  id: number;
  id_1c: string;
  barcode: number;
  vendor_code: string;
  count: number;
  name: string;
  unit: number;
  category: string;
  volume: number;
  weight: number;
  dimension: string;
  status: false;
  characteristic: string;
  full_description: string;
  composition: string;
  country: string;
  title: string;
  subtitle: string;
  banner: { url: string };
  logo: { url: string };
  video: { url: string };
}