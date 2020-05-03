import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import axios from 'axios';
import PassRequestSummary from './PassRequestSummary/PassRequestSummary';
import Modal from './Modal/Modal'

class IssuePass extends Component {

    state = {
        vehicleDetails: [],
        selectedVehicleDetails: null,
        viewButtonClicked: false
    }

    componentDidMount() {

        axios.get('http://localhost:8080/user/vehicleDtls/getall')
            .then((response) => {
                this.setState({
                    vehicleDetails: response.data
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

    callUpdateHandler = (event) => {
        console.log(event.target.value);
        let VehicleDtls = {
            requestStatus: event.target.value
        }
        var id = this.state.selectedVehicleDetails.id.toString();
        let url = 'http://localhost:8080/admin/vehicleDtls/update/'.concat(id);


        axios.put(url, VehicleDtls)
            .then((response) => {
                this.setState({
                    viewButtonClicked: false
                })
            }).then((response) => {
                this.setState({
                    vehicleDetails: response.data
                })
            });

           
    }

    clickViewDetails = (event) => {
        this.setState({
            selectedVehicleDetails: this.selectDetails(event.target.id),
            viewButtonClicked: true
        })
    }

    cancelViewDetailshandler = () => {
        this.setState({
            viewButtonClicked: false
        })
    }

    selectDetails(id) {
        for (let i = 0; i < this.state.vehicleDetails.length; i++) {
            if (this.state.vehicleDetails[i].id == id)
                var element = this.state.vehicleDetails[i];
        }
        return element;
    }



    render() {
        let rows = null;
        if (this.state.vehicleDetails != null) {
            rows = this.state.vehicleDetails.map(vehicle => {
                return (
                    <tr key={vehicle.id}>
                        <td>{vehicle.employeeId}</td>
                        <td>{vehicle.employeeName}</td>
                        <td>{vehicle.vehicleNumber}</td>
                        <td>{vehicle.vehicleType}</td>
                        <td>{vehicle.requestStatus}</td>
                        <td><button onClick={this.clickViewDetails} id={vehicle.id} className='btn btn-primary'>View Details</button></td>
                    </tr>);
            })
        }



        return (
            <div className="animated fadeIn">
                <Modal modelClicked={this.state.viewButtonClicked} cancelViewDetailsHandler={this.cancelViewDetailshandler} >
                    <PassRequestSummary vehiclePassRequest={this.state.selectedVehicleDetails} buttonClick={this.callUpdateHandler}></PassRequestSummary>
                </Modal>

                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Simple Table
                            </CardHeader>
                            <CardBody>

                                <Table responsive striped>
                                    <thead>
                                        <tr>
                                            <th>Employee Id</th>
                                            <th>Employee Name</th>
                                            <th>Vehicle Number</th>
                                            <th>Vehicle Type</th>
                                            <th>Request Status</th>
                                            <th>View Request</th>
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

export default IssuePass; 