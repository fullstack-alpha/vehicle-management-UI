import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import axios from "axios";

class PopUpInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            info: false,
        };

        this.toggle = this.toggle.bind(this);
        this.toggleInfo = this.toggleInfo.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }

    toggleInfo() {
        this.setState({
            info: !this.state.info,
        });
    }

    handleClick() {
        const { id,employeeName,employeeId ,emailId,vehicleType,vehicleNumber,requestStatus} = this.props;
        try {
            axios.put(`http://localhost:8080/user/vehicleDtls/update/${id}`, {
                employeeName,
                employeeId,
                emailId,
                vehicleType,
                vehicleNumber,
                id,
                requestStatus
            }) .then(response => console.log(response)).catch(err => { console.log(err) });
        }catch (err) {
            console.log("Error while updating vehicle details for renewal "+err);
        }

    }

    render() {
        return (
                            <div>
                                <Button color="info" onClick={this.toggleInfo} className="mr-1">Renew</Button>
                                <Modal isOpen={this.state.info} toggle={this.toggleInfo}
                                       className={'modal-info ' + this.props.className}>
                                    <ModalHeader toggle={this.toggleInfo}>Renew Request</ModalHeader>
                                    <ModalBody>
                                       Are you sure, want to renew this request
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.handleClick}>Renew</Button>{' '}
                                        <Button color="secondary" onClick={(e): void => {
                                            e.preventDefault();
                                            window.location.href='/base/requestStatus';
                                        }}>Cancel</Button>                                    </ModalFooter>
                                </Modal>

                            </div>
        );
    }
}

export default PopUpInfo;
