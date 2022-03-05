import { FC, Fragment } from "react";
import { Container, Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Google, Logout } from "@mui/icons-material";
import { getActiveUser } from "./activeUserUseAction";
import { withData, withLoader } from "./WithLoader";
import { compose } from "redux";
import { useAction } from "./activeUserUseAction";

const SignIn: FC = (props: any) => {
  const styles = useStyles();
  const googleOAuth = () => {
    window.open(
      `${process.env.REACT_APP_AUTH_SERVER_URL}/auth/google`,
      "_self"
    );
  };

  const { signout } = useAction();
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
        onClick={() => signout()}
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
        {isLogin ? showLogoutButton() : showLoginIn()}
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles({
  Button: { marginTop: "1em" }, // a style rule
});

export default compose(withData(getActiveUser), withLoader)(SignIn);
