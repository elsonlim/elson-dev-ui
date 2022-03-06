import { AxiosError } from "axios";
import { Dispatch } from "redux";
import { httpClient } from "./axios";
import { userAction, usersActionType } from "./usersInterface";

export const getUsers = () => {
  return async (dispatch: Dispatch<userAction>) => {
    dispatch({
      type: usersActionType.fetch_start,
    });

    httpClient
      .get(`/admin/users`)
      .then((payload) => {
        const usersData = payload.data.map((user: any) => {
          user.id = user._id;
          return user;
        });

        dispatch({
          type: usersActionType.fetch_success,
          payload: usersData,
        });
      })
      .catch((error: AxiosError) => {
        dispatch({
          type: usersActionType.fetch_fail,
          payload: error.message,
        });
      });
  };
};
