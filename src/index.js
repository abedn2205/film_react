import React from "react";
import ReactDOM from "react-dom";
import Routers from "./Routers";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// global state
const stateFilm = {
  activeItems: "beranda",
  home: "Halaman Home Films",
};

const reducerfilm = (state = stateFilm, action) => {
  console.log("action nya =>", action);
  switch (action.type) {
    case "ACTIVE_ITEM":
      var stateActiveItems = { ...state, activeItems: action.activeItem };
      return stateActiveItems;
    default:
      return state;
  }
};

const store = createStore(reducerfilm);

ReactDOM.render(
    <Auth0Provider
      domain="dev-b5gnufe9.us.auth0.com"
      clientId="3VUtyycwQYuYP4LOz41CWNiP5RSlHYIb"
      redirectUri={window.location.origin}
    >
      <Provider store={store}>
        <Routers />
      </Provider>
    </Auth0Provider>,
  document.getElementById("root")
);
