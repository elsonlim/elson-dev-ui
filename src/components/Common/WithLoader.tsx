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

const withData =
  (Child: FC, selector: getState, action?: reduxAction): FC =>
  (props: any) => {
    const state = selector();
    const dispatch = useDispatch();
    const { isLoading, error } = state;

    useEffect(() => {
      action && dispatch(action());
    }, [dispatch]);

    console.log(isLoading, error);
    return (
      <Fragment>
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Alert variant="outlined" severity="error">
            {error}
          </Alert>
        ) : (
          <Child {...state} {...props} />
        )}
      </Fragment>
    );
  };

export default withData;
