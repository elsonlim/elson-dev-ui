import { FC, Fragment, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import { Button, Typography } from "@mui/material";
import NavBarMenu from "./NavBarMenu";
import { Link } from "react-router-dom";
import { getLoginUser, useAction } from "./useAction";

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

const NavBar: FC = () => {
  const { fetchUser } = useAction();
  const { isLoading, data } = getLoginUser();

  const isLogin = !isLoading && data;

  useEffect(() => {
    fetchUser();
  }, []);
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

export default NavBar;
