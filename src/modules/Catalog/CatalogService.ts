import CategoryModel from "./models/CategoryModel";
import { BaseService } from "@/_core/service/BaseService";
import { RouteLink } from "@/_core/models/RouteLink";
import { lazyLoad } from "@/utils/Common";

export class CatalogService extends BaseService {
  async getRoot() {
    return await this.getArrayOrEmpty(CategoryModel, "users/product-categories-menu");
  }

  async getBySlug(slug: string) {
    const res = await this.getOneOrDefault(CategoryModel, `users/product-categories/${slug}`);
    if (!!res.subcategory) {
      res.subcategory.forEach((iter) => {
        if (!!iter.parent_id) {
          iter.parent = res;
        }
      });
    }
    return res;
  }

  buldBreadCrumb(breadCrumbList: RouteLink[], model: CategoryModel | null) {
    if (!!model) {
      breadCrumbList.push({ linkName: model.title, name: model.meta_slug });
      if (!!model.parent) {
        this.buldBreadCrumb(breadCrumbList, model.parent);
      }
    }
  }

  async addCatalogRoutes() {
    const root = await this.getRoot();
    root.forEach((iter) => {
      this.addCatalogRoute(iter);
    });
  }

  addCatalogRoute(model: CategoryModel) {
    if (model.meta_slug === "odit") {
      console.log(model);
    }

    if (this.ctx.app.router?.getRoutes().findIndex((iter) => iter.name === model.meta_slug) === -1) {
      const config = {
        name: model.meta_slug,
        path: `/${!!model.parent ? model.parent.meta_slug : "catalog"}/${model.meta_slug}`,
        props: { slug: model.meta_slug },
        component: () => lazyLoad(import("@/modules/Catalog/pages/CategoryPage.vue")),
      };
      this.ctx.app.router?.addRoute(config);
    }
    if (!!model.subcategory?.length) {
      model.subcategory.forEach((iter) => this.addCatalogRoute(iter));
    }
  }

  createCategoryRouteLocation(model: CategoryModel) {
    return {
      name: model.meta_slug,
      params: { slug: model.meta_slug },
    };
  }
}
