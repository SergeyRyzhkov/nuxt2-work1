export enum LogonStatus {
  OK,
  ShouldChangePassword,
  UserNotFoundButSocialNetworkAuthOK,
  Failed,
  Blocked,
  Error,
  Unknown,
  RequereConfirmBySmsCode,
  RegistrationNotConfirmed,
  PasswordChanged,
}

export class LogonResult {
  public logonStatus: LogonStatus = LogonStatus.Unknown;
  public message: string;
}
