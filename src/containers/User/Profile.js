import React, { Component } from 'react';
import { Container, Row, Card, Jumbotron, Button, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Profile extends Component {

    constructor(){
        super();
        this.state = {
            empName: "",
            empDesignation: "",
            empId: ""
          }
    }

    componentDidMount(){
        if(!this.props.employeeDetails.employee)
            return
        this.setState({
            empName: this.props.employeeDetails.employee.employeeName,
            empDesignation: this.props.employeeDetails.employee.designation,
            empId: this.props.employeeDetails.employee.employeeId
        })
    }

    componentWillReceiveProps(newProp){
        if(!newProp.employeeDetails.employee)
            return
        this.setState({
            empName: newProp.employeeDetails.employee.employeeName,
            empDesignation: newProp.employeeDetails.employee.designation,
            empId: newProp.employeeDetails.employee.employeeId
        })
    }

    render() {
        let styles = {
            width: '100px',
            height: '100px'
          };

          let {empName, empDesignation, empId} = this.state;

          if(!empName){
              return '<span>Loading ...</span>'
          }

        return (
            <Jumbotron>
                <Container>
                        <Card>
                            <Card.Img variant="top" style={styles} src="../../assets/img/avatars/6.png" />
                            <Card.Body>
                                <Row>
                                    <Col sm={2}><b>Name:</b></Col>
                                    <Col sm={4}>{empName}</Col>
                                    <Col sm={2}><b>Designation:</b></Col>
                                    <Col sm={4}>{empDesignation}</Col>
                                </Row>
                                <br></br>
                                <Row>
                                    <Col sm={2}><b>Job Level:</b></Col>
                                    <Col sm={4}>Level 4</Col>
                                    <Col sm={2}><b>Employee ID:</b></Col>
                                    <Col sm={4}>{empId}</Col>
                                </Row>
                            </Card.Body>
                        </Card>
                </Container>
            </Jumbotron>
        )
    }
}

Profile.propTypes = {
    employeeDetails: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    employeeDetails: state.employeeDetails
});

export default connect(mapStateToProps)(Profile);
