import React, { Component } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";

class ReportViolation extends Component {
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
      violationId: null,
      employeeName: "",
      employeeId: "",
      dateOfOffence: "",
      vehicleNo: "",
      remarks: "",
      errorMessage: false,
      alert: false,
    };
  }

  handleChange(event) {
    let inputName = event.target.name;
    let value = event.target.value;
    this.setState({ [inputName]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      employeeName,
      employeeId,
      dateOfOffence,
      vehicleNo,
      remarks,
    } = this.state;
    try {
      axios
        .post("http://localhost:8080/parkingViolation/create", {
          employeeName,
          employeeId,
          dateOfOffence,
          vehicleNo,
          remarks,
        })
        .then((response) =>
          this.setState({ alert: true, violationId: response.data })
        )
        .catch((err) => {
          this.setState({ alert: false, errorMessage: true });
        });
    } catch (err) {
      console.log("Error while creating parking violation detail " + err);
    }
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => {
      return { fadeIn: !prevState };
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="animated fadeIn">
          {!this.state.alert ? (
            <Col xs="12" sm="12">
              <Card>
                <CardHeader>
                  <strong>Report Violation</strong>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <Label htmlFor="employeeName">Emp Name</Label>
                    <Input
                      type="text"
                      name="employeeName"
                      required="required"
                      value={this.state.employeeName}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="employeeID">Emp ID</Label>
                    <Input
                      type="text"
                      id="employeeID"
                      name="employeeId"
                      required="required"
                      value={this.state.employeeId}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="vehicleNo"> Vehicle Number</Label>
                    <Input
                      type="text"
                      id="vehicleNo"
                      required="required"
                      name="vehicleNo"
                      value={this.state.vehicleNo}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="dateOfOffence">Offence Date</Label>
                    <Input
                      type="text"
                      id="dateOfOffence"
                      required="required"
                      name="dateOfOffence"
                      value={this.state.dateOfOffence}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="remarks">Remarks</Label>
                    <Input
                      type="text"
                      id="remarks"
                      required="required"
                      name="remarks"
                      value={this.state.remarks}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i> Submit
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          ) : (
              <Card>
                <CardBody>
                  <Col xs="12" md="12">
                    <CardBody>
                      <Alert color="success">
                        <h4 className="alert-heading">
                          Parking Violation Created Successfully!
                    </h4>
                        <p>
                          Ticket No.{this.state.violationId}
                          <hr />
                          <p className="mb-0">
                            {/* <Button className="alert-link" onClick={()=>this.setState({alert:!this.state.alert})}>Raise a another request here</Button>*/}
                            <a onClick={() => this.setState({ alert: !this.state.alert, employeeName: "", vehicleNo: "", employeeId: "", dateOfOffence: "", remarks: "" })} className="btn btn-link">Raise a another request here...</a>
                          </p>
                        </p>
                      </Alert>
                    </CardBody>
                  </Col>
                </CardBody>
              </Card>
            )}
        </div>
      </form>
    );
  }
}

export default ReportViolation;
