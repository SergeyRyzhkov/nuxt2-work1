import TrainingModel from "./models/TrainingModel";
import { BaseService } from "@/_core/service/BaseService";
import { Pagination } from "@/_core/models/Pagination";
import Cacheable from "@/_core/MethodCacheDecorator";

export class TrainingService extends BaseService {
  @Cacheable(0)
  async getAll(pagination: Pagination, _dateFrom?: string, _dateTo?: string) {
    return await this.getArrayOrEmptyWithPagination(
      TrainingModel,
      `users/trainings?date_from=${_dateFrom}&date_to=${_dateTo}`,
      {},
      pagination
    );
  }

  @Cacheable(0)
  async getById(id: number) {
    return await this.getOneOrDefault(TrainingModel, `users/trainings/${id}`);
  }
}
