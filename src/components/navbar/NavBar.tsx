import { FC, Fragment } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import { Button, Typography } from "@mui/material";
import NavBarMenu from "./NavBarMenu";
import { Link } from "react-router-dom";
import { getLoginUser } from "./useAction";
import withData from "../Common/WithLoader";
import { fetchUser } from "./userActions";

const SignInButton: FC = () => {
  return (
    <Button color="success">
      <Link
        to={"signin"}
        style={{
          color: "white",
          textDecoration: "none",
        }}
      >
        To Login Page
      </Link>
    </Button>
  );
};

const NavBar: FC = (props: any) => {
  const { isLoading, data } = props;
  const isLogin = !isLoading && data;

  return (
    <Fragment>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome {isLogin ? data.name : "Stranger"}
          </Typography>

          {isLogin ? <NavBarMenu /> : <SignInButton />}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default withData(NavBar, getLoginUser, fetchUser);
