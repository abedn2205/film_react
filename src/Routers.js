import React, { Component } from "react";
import { BrowserRouter as Router, Switch,Route } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import Film from "./Film";
import Actor from "./Actor";
import Beranda from "./Beranda";
import ProtectedRoute from "./auth/protected-route";
import DetailFilm from "./DetailFilm"

export default class Routers extends Component {
  render() {
    return (
      <Router>
        <App />
        <Switch>
        <Route path="/" exact component={Beranda} />
        <ProtectedRoute path="/home" component={Home} />
        <ProtectedRoute path="/film" component={Film} />
        <ProtectedRoute path="/detail/:id" component={DetailFilm} />
        <ProtectedRoute path="/actor" component={Actor} />
        </Switch>
      </Router>
    );
  }
}
