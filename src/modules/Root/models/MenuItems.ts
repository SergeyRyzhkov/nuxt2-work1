import { RouteLink } from "@/_core/models/RouteLink";

export class MenuItems {
  catalog: RouteLink = {
    linkName: "Каталог",
    name: "catalog",
  };

  education: RouteLink = {
    linkName: "Обучение",
    name: "education",
  };

  promotion: RouteLink = {
    linkName: "Акции",
    name: "promotion",
  };

  news: RouteLink = {
    linkName: "Новости",
    name: "news",
  };

  contacts: RouteLink = {
    linkName: "Контакты",
    name: "contacts",
  };

  about: RouteLink = {
    linkName: "О нас",
    name: "about",
  };

  help: RouteLink = {
    linkName: "Помощь",
    name: "help",
  };

  faq: RouteLink = {
    linkName: "Вопрос-ответ",
    name: "faq",
  };
}
