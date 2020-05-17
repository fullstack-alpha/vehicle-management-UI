import React, { Component } from 'react';
import axios from 'axios';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle, Pagination, PaginationItem, PaginationLink,
  Row,
  Table,
  UncontrolledDropdown
} from 'reactstrap';
import PropTypes from "prop-types";
import {connect} from "react-redux";

class RequestStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requestStatus:"",
      regNo:""
    };
  }

 componentDidMount() {
    console.log("EmployeeID to get vehicle status" +this.props.employeeDetails.employee.employeeId)
    axios.get('http://localhost:8080/user/vehicleDtls/getbyempid/'+this.props.employeeDetails.employee.employeeId)
        .then(response => {
          console.log(response.data);
          this.setState({
            requestStatus: response.data.requestStatus,
            regNo:response.data.vehicleNumber
          })
        })
        .catch(error => {
          console.log(error);
        });
   //console.log("Request Status of the employee EmployeeID " +this.state.requestStatus)

 }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <h3>Check{this.state.requestStatus}</h3>

            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Pass Status
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>EmployeeID</th>
                    <th>Vehicle Number</th>
                    <th>Request Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>{this.props.employeeDetails.employee.employeeName}</td>
                    <td>{this.props.employeeDetails.employee.employeeId}</td>
                    <td>{this.state.regNo}</td>
                    <td>
                      <Badge color="secondary">{this.state.requestStatus}</Badge>
                    </td>
                  </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}


RequestStatus.propTypes = {
  employeeDetails: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
  employeeDetails: state.employeeDetails
});

export default connect(mapStateToProps)(RequestStatus);