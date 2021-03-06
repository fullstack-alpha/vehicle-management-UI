import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import { Container } from "reactstrap";
import SecureRoute from "../../security/SecureRoutes";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import GetEmployeeDetails from "../../Actions/UserManagement/EmployeeAction";
import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav
} from "@coreui/react";
// sidebar nav config
import navigation from "../../_nav";
// routes config
import routes from "../../routes";

const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

class DefaultLayout extends Component {

  constructor(){
    super();
  }


  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  componentWillMount() {
    this.props.GetEmployeeDetails();
  };

  render() {
    let filterdList=[];
    if(this.props.auth.validToken){
      filterdList = navigation.items.map(child => {
      let newmap = child;
      if (newmap.children !== undefined)
        newmap.children = newmap.children.filter(
          elem => elem.user === (this.props.auth.user.scopes[0].authority).toLowerCase()
        );
      return newmap;
    })
  }
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body app-top-padding">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav
                navConfig={{items: filterdList}}
                {...this.props}
                router={router}
              />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            {/* <AppBreadcrumb appRoutes={routes} router={router}/> */}
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <SecureRoute
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        component={route.component}
                      />
                    ) : null;
                  })}
                </Switch>
                <Route exact path="/" render={() => <Redirect to="/login" />} />
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

DefaultLayout.propTypes = {
  GetEmployeeDetails: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps= state => (
  {
    auth:state.auth,
    employeeDetails: state.employeeDetails
  }
)

export default connect(mapStateToProps, {GetEmployeeDetails})(DefaultLayout);
