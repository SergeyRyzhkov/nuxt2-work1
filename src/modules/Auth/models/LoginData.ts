import { BaseViewModel } from "@/_core/models/BaseViewModel";

export default class LoginData extends BaseViewModel {
  public constructor(init?: Partial<LoginData>) {
    super();
    Object.assign(this, init);
  }

  public email: string | null = "";
  public password: string | null = "";
}
