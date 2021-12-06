import { RouteLink } from "@/_core/models/RouteLink";
import { BaseService } from "@/_core/service/BaseService";

export class ContentService extends BaseService {
  private footerMenuItemInd = "footer";

  public getMainMenuItems(): RouteLink[] {
    return this.getAllMenuItems();
  }

  public getFooterMenuItems(): RouteLink[] {
    return this.getAllMenuItems().filter((menuItem) => menuItem.addInfo === this.footerMenuItemInd);
  }

  private getAllMenuItems(): RouteLink[] {
    const agent: RouteLink = {
      linkName: "Агентствам",
      name: "for-agensy",
      addInfo: this.footerMenuItemInd,
    };

    const about: RouteLink = {
      linkName: "О компании",
      name: "about",
      addInfo: this.footerMenuItemInd,
    };

    const pay: RouteLink = {
      linkName: "Способы оплаты",
      name: "payments",
    };

    const faq: RouteLink = {
      linkName: "Частые вопросы",
      name: "faq",
    };

    const contacts: RouteLink = {
      linkName: "Контакты",
      name: "contacts",
      addInfo: this.footerMenuItemInd,
    };

    const stocks: RouteLink = {
      linkName: "Акции",
      name: "stocks",
      addInfo: this.footerMenuItemInd,
    };

    return [agent, about, pay, faq, contacts, stocks];
  }
}
