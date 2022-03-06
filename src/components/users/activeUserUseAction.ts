import * as ActiveUserAction from "./activeUserActions";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import deepEqual from "react-fast-compare";
import { ActiveUsersState } from "./activeUserInterfaces";

export const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActiveUserAction, dispatch);
};

export const getActiveUserState = () => {
  return (() =>
    useSelector(
      (state: any) => state.activeUser,
      deepEqual
    ) as ActiveUsersState)();
};
