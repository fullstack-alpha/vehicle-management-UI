import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import "./App.scss";
import {Provider} from "react-redux";
import { store } from "./store";
import setAuthorizationToken from './security/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { LogoutUser } from "./Actions/UserManagement/SecurityActions";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

const jwtToken = localStorage.token;

if(jwtToken){
  setAuthorizationToken(jwtToken);
  const decode = jwtDecode(jwtToken);
  store.dispatch({
    type: "SET_USER_SESSION",
      payload: decode
  })

  const currentTimeinMillies = Date.now()/1000
  if(decode.exp < currentTimeinMillies){
    store.dispatch(LogoutUser())
    this.history.push("/login");
  }
}

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./containers/Pages/Login/Login"));

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route
                exact
                path="/login"
                name="Login Page"
                render={props => <Login {...props} />}
              />
              <Route
                path="/"
                name="Home"
                render={props => <DefaultLayout {...props} />}
              />
            </Switch>
          </React.Suspense>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
