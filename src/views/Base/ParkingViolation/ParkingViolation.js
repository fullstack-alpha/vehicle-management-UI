import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import axios from 'axios';
import Modal from './Modal/Modal';
import ParkingViolationSummary from './ParkingViolationSummary/ParkingViolationSummary';
import PropTypes from "prop-types";
import {connect} from "react-redux";

class ParkingViolation extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          userViolationDetails: [],
          selectedUserViolationDetails: null,
          viewButtonClicked: false
        };
      }
    componentDidMount() {
        console.log("EmployeeID to get vehicle status" +this.props.employeeDetails.employee.employeeId);
        axios.get('http://localhost:8080/parkingViolation/getbyempid/'+this.props.employeeDetails.employee.employeeId)
            .then((response) => {
                this.setState({
                    userViolationDetails: response.data
                })
            });
    }

    // componentDidUpdate() {

    //     axios.get('http://localhost:8080/user/vehicleDtls/getall')
    //         .then((response) => {
    //             this.setState({
    //                 vehicleDetails: response.data
    //             })
    //         });
    // }

    

    clickViewDetails = (event) => {
        this.setState({
            selectedUserViolationDetails: this.selectDetails(event.target.id),
            viewButtonClicked: true
        })
    }

    cancelViewDetailshandler = () => {
        this.setState({
            viewButtonClicked: false
        })
    }

    selectDetails(id) {
        for (let i = 0; i < this.state.userViolationDetails.length; i++) {
            if (this.state.userViolationDetails[i].violationId == id)
                var element = this.state.userViolationDetails[i];
        }
        return element;
    }



    render() {
        let rows = null;
        if (this.state.userViolationDetails != null) {
            rows = this.state.userViolationDetails.map(violation => {
                return (
                    <tr key={violation.violationId}>
                        <td>{violation.vehicleNo}</td>
                        <td>{violation.employeeId}</td>
                        <td>{violation.employeeName}</td>
                        <td>{violation.dateOfOffence}</td>
                        <td>{violation.remarks}</td>
                        <td><button onClick={this.clickViewDetails} id={violation.violationId} className='btn btn-primary'>View Details</button></td>
                    </tr>);
            })
        }



        return (
            <div className="animated fadeIn">
                <Modal modelClicked={this.state.viewButtonClicked} cancelViewDetailsHandler={this.cancelViewDetailshandler} >
                    <ParkingViolationSummary userViolationDetail={this.state.selectedUserViolationDetails}></ParkingViolationSummary>
                </Modal>

                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Violation Details
                            </CardHeader>
                            <CardBody>

                                <Table responsive striped>
                                    <thead>
                                        <tr>
                                            <th>Vehicle No</th>
                                            <th>Employee Id</th>
                                            <th>Employee Name</th>
                                            <th>Date of Offence</th>
                                            <th>Remarks</th>
                                            <th>View Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </Table>
                                <Pagination>
                                    <PaginationItem>
                                        <PaginationLink previous tag="button"></PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem active>
                                        <PaginationLink tag="button">1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink tag="button">2</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink tag="button">3</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink tag="button">4</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink next tag="button"></PaginationLink>
                                    </PaginationItem>
                                </Pagination>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

ParkingViolation.propTypes = {
    employeeDetails: PropTypes.object.isRequired
  }
  
  const mapStateToProps = state =>({
    employeeDetails: state.employeeDetails
  });
  
  export default connect(mapStateToProps)(ParkingViolation);