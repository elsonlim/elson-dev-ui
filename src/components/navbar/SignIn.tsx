import { FC, Fragment } from "react";
import axios from "axios";
import { Container, Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Google, Logout } from "@mui/icons-material";
import { getLoginUser } from "./useAction";
import withData from "../Common/WithLoader";

const SignIn: FC = (props: any) => {
  const styles = useStyles();
  const googleOAuth = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const googleOAuthOut = () => {
    axios.get("http://localhost:5000/auth/logout", { withCredentials: true });
  };

  const { isLoading, data } = props;

  const isLogin = !isLoading && data;

  const showLoginIn = () => {
    return (
      <Fragment>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Google />}
          onClick={googleOAuth}
          className={styles.Button}
        >
          Sign In with Google
        </Button>
      </Fragment>
    );
  };

  const showLogoutButton = () => {
    <div>you are logged in</div>;
    return (
      <Button
        variant="contained"
        color="secondary"
        startIcon={<Logout />}
        onClick={googleOAuthOut}
        className={styles.Button}
      >
        Logout
      </Button>
    );
  };

  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {isLogin ? showLogoutButton : showLoginIn()}
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles({
  Button: { marginTop: "1em" }, // a style rule
});

export default withData(SignIn, getLoginUser);
