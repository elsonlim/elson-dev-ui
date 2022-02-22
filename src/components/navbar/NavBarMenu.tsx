import { Fragment, useState, FC } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useAction } from "./useAction";

interface NavMenuInterface {
  apps: string[];
}

interface RouteItem {
  displayName: string;
  route: string;
}

export const routesMap = new Map<string, RouteItem>([
  [
    "admin",
    {
      displayName: "Admin",
      route: "/admin",
    },
  ],
]);

const NavMenu: FC<NavMenuInterface> = ({ apps }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { signout } = useAction();
  const navigate = useNavigate();

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    signout();
    navigate("/signin");
  };

  const getRouteMenuItems = () => {
    const appRouteItems = apps.reduce(
      (combinedArray: RouteItem[], appOwnedByUser) => {
        const appRouteItem = routesMap.get(appOwnedByUser);
        appRouteItem && combinedArray.push(appRouteItem);

        return combinedArray;
      },
      []
    );

    return appRouteItems.map((appRouteItem) => {
      return (
        <MenuItem onClick={() => navigate(appRouteItem.route)}>
          {appRouteItem.displayName}
        </MenuItem>
      );
    });
  };

  return (
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
        {getRouteMenuItems()}
      </Menu>
    </Fragment>
  );
};

export default NavMenu;
