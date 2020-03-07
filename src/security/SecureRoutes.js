import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const SecureRoute = ({component: Component, auth, ...otherProps}) => (
    <Route {...otherProps} render={props => auth.validToken ? (<Component {...props}/>) : (<Redirect to="login"/>)}/>
    )

SecureRoute.prototype ={
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    auth: state.auth
})

export default connect(mapStateToProps)(SecureRoute);