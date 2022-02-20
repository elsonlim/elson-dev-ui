import { useEffect } from "react";
import { Alert, CircularProgress } from "@mui/material";
import { FC, Fragment } from "react";
import { useDispatch } from "react-redux";

interface ApiState {
  isLoading: boolean;
  error?: String | null;
  data?: any;
}

type getState = () => ApiState;
type reduxAction = () => (dispatch: any) => Promise<void>;

export const withLoader =
  (Child: FC): FC =>
  (props: any) => {
    const { isLoading, error } = props;

    return (
      <Fragment>
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Alert variant="outlined" severity="error">
            {error}
          </Alert>
        ) : (
          <Child {...props} />
        )}
      </Fragment>
    );
  };

export const withData =
  (selector: getState, action?: reduxAction) =>
  (Child: FC): FC =>
  (props: any) => {
    const dispatch = useDispatch();
    const state = selector();

    useEffect(() => {
      action && dispatch(action());
    }, [dispatch]);

    return <Child {...state} {...props} />;
  };
