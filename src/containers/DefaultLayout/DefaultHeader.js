import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/ivehicle.png'
import sygnet from '../../assets/img/brand/i.png'
import { connect } from 'react-redux';
import Login from '../Pages/Login/Login';
import { HashRouter, Route, Switch } from "react-router-dom";
import { LogoutUser } from '../../Actions/UserManagement/SecurityActions';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  constructor(){
    super();
    this.logoutCurrentUser = this.logoutCurrentUser.bind(this);

    this.state = {
      empName: "",
      empDesignation: "",
      empId: "",
      loading: false
    }
  }

  logoutCurrentUser(){
    this.props.LogoutUser();
    window.location.href="/"
  }

  // componentWillReceiveProps(newProp){
  //   this.setState({
  //     empName: newProp.employeeDetails.employee.employeeName,
  //     empDesignation: newProp.employeeDetails.employee.designation,
  //     empId: newProp.employeeDetails.employee.employeeId
  //   })
  // }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    if(!this.props.employeeDetails.employee)
    {
      return <span>Loading ...</span>
    }

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/home" className="nav-link" >Home</NavLink>
          </NavItem>
          
        </Nav>
        <Nav className="ml-auto" navbar>
          {/* <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem> */}
          {/* <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
          </NavItem> */}
          {/* <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
          </NavItem> */}
          <NavItem className="px-3 emp-name">
            <p>Hi {this.props.employeeDetails.employee.employeeName}</p>
          </NavItem>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={'../../assets/img/avatars/6.png'} className="img-avatar" alt={this.state.empId} />
            </DropdownToggle>
            <DropdownMenu right>
              {/* <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem> */}
              {/* <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem> */}
              <DropdownItem><i className="fa fa-user"></i>
                <Link to="/profile">Profile</Link>
              </DropdownItem>
              {/* <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem> */}
              {/* <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem> */}
              {/* <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem> */}
              {/* <DropdownItem divider /> */}
              {/* <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem> */}
              <DropdownItem><i className="fa fa-lock"></i> 
                <Link onClick={this.logoutCurrentUser}>Logout</Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = {
  LogoutUser: PropTypes.func.isRequired,
  employeeDetails: PropTypes.object.isRequired
}

const mapStateToProps = state =>(
  {
    employeeDetails: state.employeeDetails
  }
)

export default connect(mapStateToProps, { LogoutUser })(DefaultHeader);
