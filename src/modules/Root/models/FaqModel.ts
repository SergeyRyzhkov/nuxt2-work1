import SeoModel from "@/_core/models/SeoModel";

export default class FaqModel extends SeoModel {
  public constructor(init?: Partial<FaqModel>) {
    super();
    Object.assign(this, init);
  }

  content: {
    context: {
      title: string;
      footer: boolean;
      description: string;
    }[];
  };
}
