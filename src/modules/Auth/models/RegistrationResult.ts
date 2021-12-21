export enum RegistrationStatus {
  OK,
  RequereConfirmBySmsCode,
  RequereConfirmByEmail,
  Invalid,
  Unknown,
  AlreadyExists,
  EmailAlreadyExists,
  PhoneAlreadyExists,
}

export class RegistrationResult {
  public registrationStatus: RegistrationStatus = RegistrationStatus.Unknown;
  public message: string;
}
