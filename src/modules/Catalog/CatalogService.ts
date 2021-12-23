import CategoryModel from "./models/CategoryModel";
import ProductModel from "./models/ProductModel";
import { BaseService } from "@/_core/service/BaseService";
import { RouteLink } from "@/_core/models/RouteLink";
import { lazyLoad } from "@/utils/Common";

export class CatalogService extends BaseService {
  async getProduct(slug: string) {
    return await this.getOneOrDefault(ProductModel, `users/products/${slug}`);
  }

  async getRoot() {
    return await this.getArrayOrEmpty(CategoryModel, "users/product-categories-menu");
  }

  async getBySlug(slug: string) {
    return await this.getOneOrDefault(CategoryModel, `users/product-categories/${slug}`);
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
    if (this.ctx.app.router?.getRoutes().findIndex((iter) => iter.name === model.meta_slug) === -1) {
      const config = {
        name: model.meta_slug,
        path: CategoryModel.getRoutePath(model),
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

  createProductRouteLocation(model: ProductModel) {
    return {
      name: "product",
      params: { slug: model.meta_slug },
    };
  }
}
