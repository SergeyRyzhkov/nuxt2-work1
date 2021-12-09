import { BaseViewModel } from "@/_core/models/BaseViewModel";

export default class RegistrationData extends BaseViewModel {
  public constructor(init?: Partial<RegistrationData>) {
    super();
    Object.assign(this, init);
  }

  first_name: string | undefined | null = null;
  second_name: string | undefined | null = null;
  last_name: string | undefined | null = null;
  patronymic: string | undefined | null = null;
  address: string | undefined | null = null;
  phone: string | undefined | null = null;
  email: string | undefined | null = null;
  agreement: boolean = false;
  subscribe: boolean = false;
  password: string | undefined | null = null;
  password_confirmation: string | undefined | null = null;
  entity = 0;
  entity_name: string | undefined | null = null;
  ITN: string | undefined | null = null;
  PSRN: string | undefined | null = null;
  entity_address: string | undefined | null = null;
}
