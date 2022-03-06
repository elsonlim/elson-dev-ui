import * as UserAction from "./usersActions";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import deepEqual from "react-fast-compare";
import { UsersState } from "./usersInterface";

export const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators(UserAction, dispatch);
};

export const getUsersState = () => {
  return (() =>
    useSelector((state: any) => state.users, deepEqual) as UsersState)();
};
