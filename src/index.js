import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";
import "core-js";
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { icons } from "./assets/icons";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Loading } from "./App";
import { SnackbarProvider } from "notistack";

React.icons = icons;

ReactDOM.render(
  <SnackbarProvider maxSnack={3}>
    <Provider store={store}>
      <BrowserRouter basename="">
        <React.Suspense fallback={() => <Loading loading={true} />}>
          <App />
        </React.Suspense>
      </BrowserRouter>
    </Provider>
  </SnackbarProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
