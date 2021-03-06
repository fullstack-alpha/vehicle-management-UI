import React, { Component } from 'react';
import axios from 'axios';
import PopUpInfo from "./PopUpInfo";
import PopUpDelete from "./PopUpDelete"

import {
  Alert,
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
      passAvailable:false,
      passInfo:[],
        refresh:false
    };
      this.deleteAction = this.deleteAction.bind(this);

  }

  deleteAction(){
      console.log("printinggggg"+this.state.refresh)
      this.setState({refresh:!this.state.refresh})
      this.setState({
          refresh: !this.state.refresh,
      });
      console.log("printinggggg"+this.state.refresh)

  }

 componentDidMount() {
    console.log("EmployeeID to get vehicle status" +this.props.employeeDetails.employee.employeeId)
    axios.get('http://localhost:8080/user/vehicleDtls/getbyempid/'+this.props.employeeDetails.employee.employeeId)
        .then(response => {
          console.log(response.data);
          this.setState({
            passInfo:response.data,
            passAvailable:true
          })
        })
        .catch(error => {
          console.log(error);
        });
 }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Pass Status
              </CardHeader>
              <CardBody>
                {this.state.passInfo.length>0 ?
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>EmployeeID</th>
                    <th>Vehicle Number</th>
                    <th>Request Status</th>
                     <th>Operations</th>
                  </tr>
                  </thead>
                  {this.state.passInfo.map(status =>
                      <tbody>
                      <tr>
                      <td>{status.employeeName}</td>
                    <td>{status.employeeId}</td>
                    <td>{status.vehicleNumber}</td>
                    <td>
                    <Badge color="secondary">{status.requestStatus}</Badge>
                    </td>
                          {/*approved, rejected, pending, expired*/}
                          {status.requestStatus === "Approved" ?  <Badge color="info">
                                  You will be receiving your pass shortly
                              </Badge>:
                              <td>
                                  {status.requestStatus === "Pending" || status.requestStatus === "Rejected" ?
                                      <PopUpDelete id={status.id} deleteAction={this.deleteAction}/> :
                                      <PopUpInfo id={status.id} employeeName={status.employeeName}
                                                 employeeId={status.employeeId} vehicleNumber={status.vehicleNumber}
                                                 vehicleType={status.vehicleType} emailId={status.emailId}
                                                 requestStatus={"Pending"}/>}
                              </td>
                          }
                    </tr>
                    </tbody>)}
                </Table>
                    :
                    <Alert color="warning">
                      {/*eslint-disable-next-line*/}
                      You dont've any request in queue <a href="/base/newRequest" className="alert-link">Raise a request</a>.
                    </Alert> }
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