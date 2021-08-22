import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import StateProvider from "./StateProvider";
import PrivateRoute from "./components/PrivateRoute";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <StateProvider>
        <Switch>
          <PrivateRoute exact path="/" component={App} />
          {/* <PrivateRoute path="/update-proiofile" component={} /> */}
          <Route path="/login" component={Login}></Route>
          <Route path="/signUp" component={SignUp}></Route>
        </Switch>
      </StateProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
