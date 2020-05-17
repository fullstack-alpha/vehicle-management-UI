import React, { Component } from 'react';
import axios from 'axios';
import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
  Collapse,
  Fade,
  FormGroup,
  Label,
  Input, FormText, Button, FormFeedback, Alert
} from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import PropTypes from "prop-types";
import {connect} from "react-redux";

class NewRequest extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      employeeName: "",
      employeeDesignation: "",
      employeeId: "",
      emailId:"",
      vehicleType:"",
      vehicleNumber:"",
      errorMessage: false,
      alert:false
    };
  }


  handleChange(event) {
    let inputName = event.target.name;
    let value = event.target.value;
    this.setState({[inputName]:value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const { employeeName,employeeId ,emailId,vehicleType,vehicleNumber} = this.state;
    try {
      axios.post('http://localhost:8080/user/vehicleDtls/create', {
        employeeName,
        employeeId,
        emailId,
        vehicleType,
        vehicleNumber
      }) .then(response => this.setState({alert: true})).catch(err => { this.setState({alert: false,errorMessage:true}) });
    }catch (err) {
      console.log("Error while creating vehicle details "+err);
    }
  }

  componentDidMount(){
    this.setState({
      employeeName: this.props.employeeDetails.employee.employeeName,
      employeeDesignation: this.props.employeeDetails.employee.designation,
      employeeId: this.props.employeeDetails.employee.employeeId
    })
  }

  componentWillReceiveProps(newProp){

    this.setState({
      employeeName: newProp.employeeDetails.employee.employeeName,
      employeeDesignation: newProp.employeeDetails.employee.designation,
      employeeId: newProp.employeeDetails.employee.employeeId
    })
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {

    let {employeeName, employeeDesignation, employeeId} = this.state;

    return (

        <form onSubmit={this.handleSubmit}>
          <div className="animated fadeIn">
            {!this.state.alert ? <Col xs="12" sm="6">
                  <Card>
                    <CardHeader>
                      <strong>Vehicle Pass</strong>
                      {!this.state.errorMessage ? <small>Request</small>:
                          <Alert color="danger">
                            Please try again, we are facing some issue.
                          </Alert>}
                    </CardHeader>
                    <CardBody>
                      <FormGroup>
                        <Label htmlFor="employeeName">Emp Name</Label>
                        <Input type="text"  readOnly="readOnly" name="employeeName" value={this.state.employeeName} onChange={this.handleChange}/>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="employeeID">Emp ID</Label>
                        <Input type="text" readOnly="readOnly" id="employeeID" name="employeeId" value={this.state.employeeId} onChange={this.handleChange}/>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="designation">Designation</Label>
                        <Input type="text" id="designation" readOnly="readOnly" name="employeeDesignation" value={this.state.employeeDesignation} onChange={this.handleChange}/>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="email-input">Email ID</Label>
                        <Input type="email" id="email-input" name="emailId" placeholder="Enter IBS Email Id" autoComplete="email" value={this.state.emailId} onChange={this.handleChange}/>
                        <FormText className="help-block">Please enter your email</FormText>
                      </FormGroup>
                      <FormGroup row className="my-0">
                        <Col xs="8">
                          <FormGroup>
                            <Label htmlFor="vehicleType">Vehicle Type</Label>
                            <Input type="select" name="vehicleType" id="vehicleType" value={this.state.vehicleType} onChange={this.handleChange}>
                              <option>2-Wheeler</option>
                              <option>Car</option>
                              <option>SUV</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col xs="4">
                          <FormGroup>
                            <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                            <Input type="text" name="vehicleNumber" id="vehicleNumber" placeholder="VehicleNumber" value={this.state.vehicleNumber} onChange={this.handleChange}/>
                          </FormGroup>
                        </Col>
                      </FormGroup>
                    </CardBody>
                    <CardFooter>
                      <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                      <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                    </CardFooter>
                  </Card>
                </Col>:
                <Card>
                  <CardBody>
                    <Col xs="12" md="6">
                      <Card>
                        <CardHeader>
                          <i className="fa fa-align-justify"></i><strong>Request</strong>
                          <small>Success</small>
                        </CardHeader>
                        <CardBody>
                          <Alert color="success">
                            <h4 className="alert-heading">New Vehicle Pass Request Created!</h4>
                            <p>
                              Aww yeah, you've successfully raised a request to Admin team for new vehicle pass request. Once the vehicle pass request is accepted by admin team you will recieve notification to your emaild <span style={{color:'red'}}>{this.state.emailId}</span>
                              <hr />
                              <p className="mb-0">
                                <a href="/base/newRequest" className="alert-link">Raise a another request here..</a>.
                              </p>
                            </p>
                          </Alert>
                        </CardBody>
                      </Card>
                    </Col>
                  </CardBody>
                </Card>}
          </div>
        </form>
    );
  }
}


NewRequest.propTypes = {
  employeeDetails: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
  employeeDetails: state.employeeDetails
});

export default connect(mapStateToProps)(NewRequest);