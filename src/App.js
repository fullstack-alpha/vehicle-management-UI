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
const Register = React.lazy(() => import("./views/Pages/Register"));
const Page404 = React.lazy(() => import("./views/Pages/Page404"));
const Page500 = React.lazy(() => import("./views/Pages/Page500"));

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
                exact
                path="/register"
                name="Register Page"
                render={props => <Register {...props} />}
              />
              <Route
                exact
                path="/404"
                name="Page 404"
                render={props => <Page404 {...props} />}
              />
              <Route
                exact
                path="/500"
                name="Page 500"
                render={props => <Page500 {...props} />}
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

// App.prototype = {
//   
//   employeeDetails: PropType.object.isRequired
// }

// const mapStateToProps= state => {
//   employee: state.employeeDetails
// }

// export default connect(null, {GetEmployeeDetails})(App);
export default App;
