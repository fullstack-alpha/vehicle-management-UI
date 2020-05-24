import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import axios from 'axios';


class PopUpDelete extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      danger: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleDanger = this.toggleDanger.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.redirect = this.redirect.bind(this);

  }

   redirect() {
      window.location.href='/base/requestStatus';
   }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleDanger() {
    this.setState({
      danger: !this.state.danger,
    });
  }

  handleClick() {
       try {
            axios.delete(`http://localhost:8080/user/vehicleDtls/delete/${this.props.id}`).then(this.toggleDanger)
            //.then(this.props.deleteAction);
            .then(this.redirect)
          }catch (err) {
            console.log("Error while deleting vehicle details "+err);
          }

   }

  render() {
    return (
              <div>
                <Button color="danger" onClick={this.toggleDanger} className="mr-1">Delete</Button>
                <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
                       className={'modal-danger ' + this.props.className}>
                  <ModalHeader toggle={this.toggleDanger}>Delete Request</ModalHeader>
                  <ModalBody>
                    Are you sure, want to delete this request.
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onClick={this.handleClick}>Delete</Button>{' '}
                    <Button color="secondary" onClick={this.toggleDanger}>Cancel</Button>
                  </ModalFooter>
                </Modal>
              </div>
    );
  }
}

export default PopUpDelete;
