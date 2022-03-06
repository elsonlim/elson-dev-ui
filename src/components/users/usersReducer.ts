import { userAction, UsersState, usersActionType } from "./usersInterface";

const initialState: UsersState = {
  isLoading: false,
};

const usersReducer = (state = initialState, action: userAction): UsersState => {
  switch (action.type) {
    case usersActionType.fetch_start:
      return { isLoading: true, error: null, data: null };
    case usersActionType.fetch_success:
      return { isLoading: false, error: null, data: action.payload };
    case usersActionType.fetch_fail:
      return { isLoading: false, error: action.payload, data: null };
    default:
      return state;
  }
};

export default usersReducer;
