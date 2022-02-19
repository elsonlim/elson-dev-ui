import * as userActions from "./userActions";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import deepEqual from "react-fast-compare";
import { UserState } from "./userInterfaces";

export const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators(userActions, dispatch);
};

export const getLoginUser = () => {
  return (() =>
    useSelector((state: any) => state.loginUser, deepEqual) as UserState)();
};
