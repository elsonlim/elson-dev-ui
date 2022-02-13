import React from "react";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import "./App.css";
import NavBar from "./components/navbar/NavBar";
import Routers from "./Routers";
import store from "./store";
import { theme } from "./material/createTheme";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Routers />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
