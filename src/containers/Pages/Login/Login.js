import React, { Component } from "react";
import { Link } from "react-router-dom";
import { format } from "util";
import logo from '../../../assets/img/brand/ivehicle.png'
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import { connect } from "react-redux";
import PropType from "prop-types";
import { LoginUserAction } from "../../../Actions/UserManagement/SecurityActions";
import Alert from "../../../common/errorAlert";

class Login extends Component {

constructor(){
  super();

  this.state = {
    userName:"",
    password:"",
    errorStatus: 0, 
    error: "", 
    message: "",
    errorFlag: false
  }

  this.loginController = this.loginController.bind(this);
  this.setvalue = this.setvalue.bind(this);
}

componentWillReceiveProps(newProps) {    
  if(newProps.auth.validToken)
      newProps.history.push("home");
  else{
    this.setState({
      errorStatus: newProps.error.status, 
      error: newProps.error.error, 
      message: newProps.error.message,
      errorFlag: true
    })
  }
}

componentDidMount(){
  if(this.props.auth.validToken)
      this.props.history.push("home");
}

  loginController(e) {
    e.preventDefault();
    this.props.LoginUserAction({
      employeeId:this.state.userName,
      password: this.state.password
    })
  };

  setvalue(event){
    this.setState({
      [event.target.id] : event.target.value
    })
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <div style={{width:'100px', height:'25px' }}>
                  <CardImg
                    variant="top"
                    alt="iVehicle"
                    src={logo}
                    
                  />
                  </div>
                  <CardBody>
                    <Form onSubmit={this.loginController}>
                      
                      <p className="text-muted">Sign In to your account</p>
                      { this.state.errorFlag ? <Alert message={this.state.message}/> : ''}
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          onChange={this.setvalue}
                          id="userName"
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          onChange={this.setvalue}
                          id="password"
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            type="submit"
                            color="primary"
                            className="px-4"
                          >
                            Login
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Login.propTypes ={
  LoginUserAction: PropType.func.isRequired,
  auth: PropType.object.isRequired,
  error: PropType.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { LoginUserAction })(Login);
