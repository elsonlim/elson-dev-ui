export enum activeUserActionType {
  GetActiveUserStart = "get_activeUser_start",
  GetActiveUserSuccess = "get_activeUser_success",
  GetActiveUserFail = "get_activeUser_fail",
  Signout = "signout",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  approved: boolean;
  apps: string[];
}

export interface ActiveUsersState {
  isLoading: boolean;
  error?: String | null;
  data?: User | null;
}

interface getActiveUserAction {
  type: activeUserActionType.GetActiveUserStart;
}

interface getActiveUserSuccessAction {
  type: activeUserActionType.GetActiveUserSuccess;
  payload: User;
}

interface getActiveUserFailAction {
  type: activeUserActionType.GetActiveUserFail;
  payload: String;
}

interface signoutAction {
  type: activeUserActionType.Signout;
}

export type activeUserAction =
  | getActiveUserAction
  | getActiveUserSuccessAction
  | getActiveUserFailAction
  | signoutAction;
