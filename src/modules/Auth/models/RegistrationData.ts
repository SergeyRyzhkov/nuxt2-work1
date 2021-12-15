import { BaseViewModel } from "@/_core/models/BaseViewModel";

export default class RegistrationData extends BaseViewModel {
  public constructor(init?: Partial<RegistrationData>) {
    super();
    Object.assign(this, init);
  }

  fio: string | undefined | null = null;
  first_name: string | undefined | null = null;
  second_name: string | undefined | null = null;
  last_name: string | undefined | null = null;
  patronymic: string | undefined | null = null;
  address: string | undefined | null = null;
  phone: string | undefined | null = "9218941537";
  email: string | null = null;
  agreement: boolean = false;
  subscribe: boolean = false;
  password: string | null = null;
  password_confirmation: string | undefined | null = null;
  entity = 0;
  entity_name: string | undefined | null = null;
  ITN: string | undefined | null = null;
  PSRN: string | undefined | null = null;
  entity_address: string | undefined | null = null;

  static buildFirstSecondPatrFromFio(data: RegistrationData) {
    data.first_name = null;
    data.patronymic = null;
    data.second_name = null;

    if (!!data && !!data.fio) {
      const arr = data.fio.trim().split(" ");
      const cleanArr = arr.filter((iter) => !!iter && iter.trim().length > 0);

      data.last_name = cleanArr[0];
      if (arr.length > 1) {
        data.first_name = cleanArr[1];
      }
      if (arr.length > 2) {
        data.patronymic = cleanArr[2];
        data.second_name = cleanArr[2];
      }
    }
  }
}
