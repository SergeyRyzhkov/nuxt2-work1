import TrainingModel from "./models/TrainingModel";
import { BaseService } from "@/_core/service/BaseService";
import { Pagination } from "@/_core/models/Pagination";

export class TrainingService extends BaseService {
  async getAll(pagination: Pagination) {
    return await this.getArrayOrEmptyWithPagination(TrainingModel, "users/trainings", {}, pagination);
  }

  async getBySlug(slug: string) {
    return await this.getOneOrDefault(TrainingModel, `users/trainings/${slug}`);
  }
}
