export enum usersActionType {
  fetch_start = "fetch_User_start",
  fetch_success = "fetch_User_success",
  fetch_fail = "fetch_User_fail",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  approved: boolean;
  apps: string[];
}

export interface UsersState {
  isLoading: boolean;
  error?: String | null;
  data?: User[] | null;
}

interface fetchUserStart {
  type: usersActionType.fetch_start;
}

interface fetchUserSuccess {
  type: usersActionType.fetch_success;
  payload: User[];
}

interface fetchUserFail {
  type: usersActionType.fetch_fail;
  payload: string;
}

export type userAction = fetchUserStart | fetchUserSuccess | fetchUserFail;
