/* eslint-disable camelcase */

import { BaseViewModel } from "@/_core/models/BaseViewModel";

export default class SessionUser extends BaseViewModel {
  // eslint-disable-next-line no-use-before-define
  public static anonymousUser: SessionUser = new SessionUser();
  id = 0;
  first_name = null;
  last_name = null;
  patronymic = null;
  address = null;
  phone = null;
  email = null;
  password = null;
  entity = null;
  entity_name = null;
  ITN = null;
  PSRN = null;
  entity_address = null;
}
