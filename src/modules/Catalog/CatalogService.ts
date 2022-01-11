import CategoryModel from "./models/CategoryModel";
import ProductModel from "./models/ProductModel";
import { BaseService } from "@/_core/service/BaseService";
import { RouteLink } from "@/_core/models/RouteLink";
import { lazyLoad } from "@/utils/Common";
import { decOfNum } from "@/utils/Formaters";

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

  buildBreadCrumb(model: CategoryModel | null) {
    const breadCrumbList: RouteLink[] = [];
    if (!!model && model.id > 0) {
      this._buildBreadCrumb(breadCrumbList, model);
    }
    breadCrumbList.push({ linkName: "Каталог", name: "catalog-root" }, { linkName: "Главная", name: "main" });
    breadCrumbList.reverse();
    return breadCrumbList;
  }

  _buildBreadCrumb(breadCrumbList: RouteLink[], model: CategoryModel | null) {
    if (!!model && !!model.id) {
      breadCrumbList.push({ linkName: model.title, name: model.meta_slug });
      if (!!model.parent) {
        this._buildBreadCrumb(breadCrumbList, model.parent);
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
        path: this.getRoutePath(model),
        props: { slug: model.meta_slug },
        component: () => lazyLoad(import("@/modules/Catalog/components/CategoryContent.vue")),
      };
      this.ctx.app.router?.addRoute("catalog", config);
    }
    if (!!model.subcategory?.length) {
      model.subcategory.forEach((iter) => this.addCatalogRoute(iter));
    }
  }

  getRoutePath(model: CategoryModel) {
    return !!model.parent ? `${this.getRoutePath(model.parent)}/${model.meta_slug}` : `/catalog/${model.meta_slug}`;
  }

  getRouteLocation(model: CategoryModel) {
    return {
      name: model?.meta_slug,
      params: { slug: model?.meta_slug },
    };
  }

  getProductRouteLocation(model: ProductModel) {
    return {
      name: "product",
      params: { slug: model.meta_slug },
    };
  }

  getAllProducts(category: CategoryModel, list: ProductModel[] = []) {
    if (category.products) {
      list = [...list, ...category.products];
    }
    category.subcategory?.forEach((iter) => {
      if (!!iter) {
        this.getAllProducts(iter, list);
      }
    });
    return list;
  }

  productCountText(model: CategoryModel) {
    return `Найдено ${model?.products.length || 0} ${decOfNum(model?.products.length || 0, ["товар", "товара", "товаров"])}`;
  }
}
