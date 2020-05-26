import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import axios from 'axios';
import PassRequestSummary from './PassRequestSummary/PassRequestSummary';
import Modal from './Modal/Modal'

class IssuePass extends Component {

    size = 5;
    state = {
        vehicleDetails: [],
        selectedVehicleDetails: null,
        viewButtonClicked: false,
        totalPages: 0,
        page: 0,
        clickedPage: 1
    }

    componentDidMount() {
        console.log('componentDidMount'+this.state.viewButtonClicked)
        this.callGetEndpoint(this.state.page, this.size)
    }

    callGetEndpoint(page, size) {
        let url = 'http://localhost:8080/admin/vehicleDtls/getAll';
        url = url.concat('?page=' + page + '&size=' + size)
        axios.get(url)
            .then((response) => {
                this.setState({
                    vehicleDetails: response.data.content,
                    totalPages: response.data.totalPages
                })
            });
    }

    makeDisabledIfClicked= (status) =>{
        if(status =='Approved' || status =='Rejected'){
            return true;
        }else{
           return false;
        }
    }

    // componentDidUpdate(prevState,nextState) {

    //     if (prevState.isUpdatedRequestCalled!==nextState.isUpdatedRequestCalled) { }
    //     axios.get('http://localhost:8080/user/vehicleDtls/getall')
    //         .then((response) => {
    //             this.setState({
    //                 vehicleDetails: response.data,
    //                 isUpdatedRequestCalled:false
    //             })
    //         });
    // }


    callUpdateHandler = (event) => {

        let VehicleDtls = {
            requestStatus: event.target.value
        }
        var id = this.state.selectedVehicleDetails.id;
        let url = 'http://localhost:8080/admin/vehicleDtls/update/'.concat(id);

    
        axios.put(url, VehicleDtls)
            .then((response) => {
                console.log('before viewButtonClicked'+this.state.viewButtonClicked);
                this.setState({
                    viewButtonClicked: !this.state.viewButtonClicked,
                    // isUpdatedRequestCalled:true
                })
                this.callGetEndpoint(this.state.page,5);
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

    paginationLinkClickHandler = (event) => {
        this.callGetEndpoint(event.target.value, this.size);
        this.setState({
            clickedPage: parseInt(event.target.value) + 1
        }
        )

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
                        <td><button onClick={this.clickViewDetails} id={vehicle.id} className='btn btn-primary' disabled={this.makeDisabledIfClicked(vehicle.requestStatus)?true:false}>Approve/Reject</button></td>
                    </tr>);
            })
        }

        let paginationItem = null;

        if (this.state.totalPages !== 0) {
            let arr = [];
            {
            for (var i = 1; i <= this.state.totalPages; i++) {
               arr.push(i);
            }
        }

            paginationItem = arr.map(i =>
                this.state.clickedPage == i ? <PaginationItem active>
                    <PaginationLink tag="button" onClick={this.paginationLinkClickHandler} value={i - 1} >{i}</PaginationLink>
                </PaginationItem> :
                    <PaginationItem>
                        <PaginationLink tag="button" onClick={this.paginationLinkClickHandler} value={i - 1} >{i}</PaginationLink>
                    </PaginationItem>)
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
                                Issue Vehicle Pass
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
                                        <PaginationLink previous tag="button" value={this.state.clickedPage - 1} onClick={this.paginationLinkClickHandler}></PaginationLink>
                                    </PaginationItem>
                                    {paginationItem}
                                    
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