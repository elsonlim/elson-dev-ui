import { userAction, userActionType, UserState } from "./userInterfaces";

const initialState: UserState = {
  isLoading: false,
};

export default (state = initialState, action: userAction): UserState => {
  switch (action.type) {
    case userActionType.GetUserStart:
      return { isLoading: true, error: null, data: null };
    case userActionType.GetUserSuccess:
      return { isLoading: false, error: null, data: action.payload };
    case userActionType.GetUserFail:
      return { isLoading: false, error: action.payload, data: null };
    case userActionType.Signout:
      return { isLoading: false, error: null, data: null };
    default:
      return state;
  }
};
