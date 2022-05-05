import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { store } from "core/redux/store/store";
import { Provider } from "react-redux";
import "./index.css";

import App from "./App";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "assets/style/theme";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Avenir';
  }
`;

ReactDOM.render(
  <>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </>,
  document.getElementById("root")
);
