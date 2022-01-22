import { BaseViewModel } from "@/_core/models/BaseViewModel";

export default class RegistrationData extends BaseViewModel {
  public constructor(init?: Partial<RegistrationData>) {
    super();
    Object.assign(this, init);
  }

  fio: string | undefined | null = null;
  first_name: string | undefined | null = null;
  last_name: string | undefined | null = null;
  patronymic: string | undefined | null = null;
  address: string | undefined | null = null;
  phone: string | undefined | null = "";
  email: string | null = null;
  agreement: boolean = true;
  subscribe: boolean = true;
  oldPassword: string | null | undefined = null;
  password: string | null | undefined = null;
  password_confirmation: string | undefined | null = null;
  entity = 0;
  entity_name: string | undefined | null = null;
  ITN: string | undefined | null = null;
  PSRN: string | undefined | null = null;
  entity_address: string | undefined | null = null;
}
