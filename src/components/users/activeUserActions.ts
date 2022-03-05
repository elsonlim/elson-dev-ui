import { AxiosError } from "axios";
import { Dispatch } from "redux";
import { httpClient } from "./axios";
import { activeUserAction, activeUserActionType } from "./activeUserInterfaces";

export const fetchActiveUser = () => {
  return async (dispatch: Dispatch<activeUserAction>) => {
    dispatch({
      type: activeUserActionType.GetActiveUserStart,
    });

    httpClient
      .get("/user")
      .then((payload) => {
        dispatch({
          type: activeUserActionType.GetActiveUserSuccess,
          payload: payload.data,
        });
      })
      .catch((error: AxiosError) => {
        dispatch({
          type: activeUserActionType.GetActiveUserFail,
          payload: error.message,
        });
      });
  };
};

export const signout = () => {
  return async (dispatch: Dispatch<activeUserAction>) => {
    httpClient.get("/auth/logout").finally(() => {
      dispatch({
        type: activeUserActionType.Signout,
      });
    });
  };
};
