import { createTheme, colors } from "@mui/material";
import { orange } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    common: {},
    primary: {
      main: colors.teal[500],
    },
    secondary: {
      main: colors.orange[500],
    },
  },
});
