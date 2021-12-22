/* eslint-disable camelcase */

import { BaseViewModel } from "@/_core/models/BaseViewModel";

export default class SessionUser extends BaseViewModel {
  // eslint-disable-next-line no-use-before-define
  public static anonymousUser: SessionUser = new SessionUser();
  id = 0;
  first_name: string | null = null;
  last_name: string | null = null;
  patronymic: string | null = null;
  address = null;
  phone = null;
  email = null;
  password = null;
  entity = 0;
  entity_name = null;
  ITN = null;
  PSRN = null;
  entity_address = null;
  price_type = null;
  subscribe: boolean = false;
  created_at = null;
  updated_at = null;
  status = null;
  agreement: boolean = false;
  oldPassword: string | null | undefined = null;
  password_confirmation: string | undefined | null = null;
  fio: string | undefined | null = null;
}
