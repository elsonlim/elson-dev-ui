import { AxiosError } from "axios";
import { Dispatch } from "redux";
import { httpClient } from "./axios";
import { userAction, userActionType } from "./userInterfaces";

export const fetchUser = () => {
  return async (dispatch: Dispatch<userAction>) => {
    dispatch({
      type: userActionType.GetUserStart,
    });

    httpClient
      .get("/user")
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
    httpClient.get("/auth/logout").finally(() => {
      dispatch({
        type: userActionType.Signout,
      });
    });
  };
};
