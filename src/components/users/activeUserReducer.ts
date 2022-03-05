import {
  activeUserAction,
  activeUserActionType,
  ActiveUsersState,
} from "./activeUserInterfaces";

const initialState: ActiveUsersState = {
  isLoading: false,
};

const usersReducer = (
  state = initialState,
  action: activeUserAction
): ActiveUsersState => {
  switch (action.type) {
    case activeUserActionType.GetActiveUserStart:
      return { isLoading: true, error: null, data: null };
    case activeUserActionType.GetActiveUserSuccess:
      return { isLoading: false, error: null, data: action.payload };
    case activeUserActionType.GetActiveUserFail:
      return { isLoading: false, error: action.payload, data: null };
    case activeUserActionType.Signout:
      return { isLoading: false, error: null, data: null };
    default:
      return state;
  }
};

export default usersReducer;
