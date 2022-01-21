import CategoryModel from "./models/CategoryModel";
import ProductModel from "./models/ProductModel";
import CatalogModel from "./models/CatalogModel";
import { BaseService } from "@/_core/service/BaseService";
import { RouteLink } from "@/_core/models/RouteLink";
import { lazyLoad } from "@/utils/Common";
import { decOfNum } from "@/utils/Formaters";
import Cacheable from "@/_core/MethodCacheDecorator";

export class CatalogService extends BaseService {
  @Cacheable(0)
  async getSearchProducts(name: string, search: string) {
    return await this.getArrayOrEmpty(ProductModel, "users/products", { params: { name, search } });
  }

  @Cacheable(0)
  async getCatalog() {
    return await this.getOneOrDefault(CatalogModel, "users/pages/catalog");
  }

  @Cacheable(0)
  getProduct(id: number) {
    return this.getOneOrDefault(ProductModel, `users/products/${id}`);
  }

  @Cacheable(0)
  async getRoot() {
    return await this.getArrayOrEmpty(CategoryModel, "users/product-categories-menu");
  }

  @Cacheable(0)
  async getById(id: number) {
    return await this.getOneOrDefault(CategoryModel, `users/product-categories/${id}`);
  }

  toogleFavorites(product: ProductModel) {
    return this.apiRequest.post(`users/products/${product.id}/favorites`, { product_id: product.id });
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
      params: { id: model.id },
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
