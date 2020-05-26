import React, { Component } from 'react';
import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import axios from 'axios';
import DeleteButtonRenderer from './DeleteButtonRenderer.js';

//import PassRequestSummary from './PassRequestSummary/PassRequestSummary';
//import Modal from './Modal/Modal'

class ViolationDetailsAG extends Component {

    state = {
        violationsDetails: [],
        selectedViolationDetails: null,
        viewButtonClicked: false,
        frameworkComponents: {
            deleteButtonRenderer: DeleteButtonRenderer
          }
    }

    componentDidMount() {

        axios.get('http://localhost:8080/parkingViolation/getall')
            .then((response) => {
                this.setState({
                    violationsDetails: response.data
                })
            });
    }

    // componentDidUpdate() {

    //     axios.get('http://localhost:8080/parkingViolation/getall')
    //         .then((response) => {
    //             this.setState({
    //                 violationsDetails: response.data
    //             })
    //         });
    // }


    clickViewDetails = (event) => {
        this.setState({
            selectedViolationDetails: this.selectDetails(event.target.id),
            viewButtonClicked: true
        })
    }

    cancelViewDetailshandler = () => {
        this.setState({
            viewButtonClicked: false
        })
    }

    selectDetails(id) {
        for (let i = 0; i < this.state.violationsDetails.length; i++) {
            if (this.state.violationsDetails[i].id == id)
                var element = this.state.violationsDetails[i];
        }
        return element;
    }



    render() {
        let rows = null;
        if (this.state.violationsDetails != null) {
            rows = this.state.violationsDetails.map(violation => {
                return (
                    {violationId: violation.violationId,vehicleNo: violation.vehicleNo, employeeId: violation.employeeId, employeeName:violation.employeeName
                        , dateOfOffence: violation.dateOfOffence,remarks: violation.remarks }
                      );
            })
        }

        const columns = [
          {
            headerName: 'Id',
            field: 'violationId',
            sortable: true,
            filter: true,
            hide :true,
            width :80
          },
          {
            headerName: 'Vehicle No',
            field: 'vehicleNo',
            sortable: true,
            filter: true,
            width :150
          },
          {
            headerName: 'Employee Id',
            field: 'employeeId',
            sortable: true,
            filter: true,
            width :130
          },
          {
            headerName: 'Employee Name',
            field: 'employeeName',
            sortable: true,
            filter: true
          },
          {
            headerName: 'Date of Offence',
            field: 'dateOfOffence',
            sortable: true,
            filter: true,
            width : 150
          },
          {
            headerName: 'Remarks',
            field: 'remarks',
            sortable: true,
            filter: true,
            width:250,
            resizable: true
          },
          {
            headerName: '',
            field: 'delete',
            cellRenderer:"deleteButtonRenderer",
            width :50
          },
        ];

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                Violation Details
                            </CardHeader>
                            <CardBody>
                            <div style={{ height: '400px', width: '1070px' }} className="ag-theme-alpine">
                            <AgGridReact 
                               columnDefs={columns}
                               rowData={rows}
                               pagination={true}
                               paginationPageSize={10}
                               frameworkComponents={this.state.frameworkComponents}
                            >
                            </AgGridReact>
                            </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ViolationDetailsAG; 