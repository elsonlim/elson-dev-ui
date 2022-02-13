import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import { userAction, userActionType } from "./userInterfaces";

export const fetchUser = () => {
  return async (dispatch: Dispatch<userAction>) => {
    dispatch({
      type: userActionType.GetUserStart,
    });

    axios
      .get("http://localhost:5000/user", {
        withCredentials: true,
      })
      .then((payload) => {
        dispatch({
          type: userActionType.GetUserSuccess,
          payload: payload.data,
        });
      })
      .catch((error: AxiosError) => {
        dispatch({
          type: userActionType.GetUserFail,
          payload: error.message,
        });
      });
  };
};

export const signout = () => {
  return async (dispatch: Dispatch<userAction>) => {
    axios
      .get("http://localhost:5000/auth/logout", { withCredentials: true })
      .finally(() => {
        dispatch({
          type: userActionType.Signout,
        });
      });
  };
};
