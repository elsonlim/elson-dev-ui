export enum userActionType {
  GetUserStart = "user_start",
  GetUserSuccess = "user_success",
  GetUserFail = "user_fail",
  Signout = "signout",
}

export interface User {
  id: String;
  name: String;
  email: String;
  role: String;
}

interface getUserAction {
  type: userActionType.GetUserStart;
}

interface getUserSuccessAction {
  type: userActionType.GetUserSuccess;
  payload: User;
}

interface getUserFailAction {
  type: userActionType.GetUserFail;
  payload: String;
}

interface signoutAction {
  type: userActionType.Signout;
}

export type userAction =
  | getUserAction
  | getUserSuccessAction
  | getUserFailAction
  | signoutAction;
