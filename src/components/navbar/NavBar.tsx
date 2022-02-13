import { FC, Fragment, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import * as userActions from "./userActions";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import deepEqual from "react-fast-compare";
import { Button, Typography, Menu, MenuItem, IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators(userActions, dispatch);
};

const NavBar: FC = () => {
  const { fetchUser, signout } = useAction();
  const { isLoading, error, data } = useSelector(
    (state: any) => state.loginUser,
    deepEqual
  );

  const isLogin = !isLoading && data;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const logout = () => {
    signout();
    navigate("/signin");
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <Fragment>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome {isLogin && data.name}
          </Typography>
          {isLogin ? (
            <Fragment>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </Fragment>
          ) : (
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
          )}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default NavBar;
