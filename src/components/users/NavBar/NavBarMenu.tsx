import { Fragment, useState, FC } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useAction } from "../activeUserUseAction";

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
    const featureRoutes = apps.reduce(
      (combinedArray: RouteItem[], appOwnedByUser) => {
        const featureRoute = routesMap.get(appOwnedByUser);
        featureRoute && combinedArray.push(featureRoute);

        return combinedArray;
      },
      []
    );

    return featureRoutes.map((appRouteItem) => {
      return (
        <MenuItem
          key={appRouteItem.route}
          onClick={() => navigate(appRouteItem.route)}
        >
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
