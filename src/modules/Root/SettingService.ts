import AppSettings from "./models/AppSettings";
import { BaseService } from "@/_core/service/BaseService";
import Cacheable from "@/_core/MethodCacheDecorator";

export class SettingService extends BaseService {
  @Cacheable(0)
  getAppSetting() {
    return this.getOneOrDefault(AppSettings, "users/settings");
  }
}
