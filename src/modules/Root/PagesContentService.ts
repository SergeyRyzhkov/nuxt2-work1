import AboutPageModel from "./models/AboutPageModel";
import { BaseService } from "@/_core/service/BaseService";

export class PagesContentService extends BaseService {
  async getMainPage() {
    return await this.getOneOrDefault(AboutPageModel, "users/pages/about");
  }
}
