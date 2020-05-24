import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {GetAllParkingSlots} from '../../Actions/ParkingSlotAction';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

class ParkingSlot extends Component {

    constructor(){
        super();
        this.state={
            parkingSLots:[]
        }
    }

    componentDidMount(){
        // this.props.GetAllParkingSlots()
        axios.get("http://localhost:8080/common/parkingSlots")
        .then(response => this.setState({
            parkingSLots: response.data
        }))
    }

    componentWillReceiveProps(newProps){
        console.log(newProps.parkingSlots);
        this.setState({
            parkingSLots:newProps.parkingSlots
        })
    }

    render() {

        const {parkingSLots} = this.state; 

        const setSlotsIntoView = () => {
            return (
                parkingSLots.map(parkingZone => (
                    <Row>
                        <nav key={parkingZone.zoneID} class="parking-zone" aria-label="pagination">
                            <h6>{parkingZone.zoneName} Zone</h6>
                            <ul class="pagination parking">
                                {
                                    parkingZone.parkingSlots.map(slot => (
                                        <li key={slot.slotID} class={slot.booked ? 'booked disabled' : ''}>
                                            <button class="page-link">
                                                <span class="up-down">{slot.slotDisplayName}</span>
                                                <i class={slot.slotDisplayIcon}></i>
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </nav>
                    </Row>
                ))
            )
        }

        return (
            <div>
                    <Container key="parkingid">
                        <Row className="header-row">
                            <div class="availability">
                                <h5 class="availability"><span class="availability-text">Available </span><div class="availability-icon available"></div></h5>
                                <h5 class="availability"><span class="availability-text">Unavailable</span><div class="availability-icon un-available"></div></h5>
                            </div>
                        </Row>
                            {
                                setSlotsIntoView()
                            }
                    </Container>
            </div>
        )
    }
}

ParkingSlot.propTypes = {
    parkingSlots: PropTypes.object.isRequired,
    GetAllParkingSlots: PropTypes.func.isRequired
}

const mapStateToProps = state => (
    {
        parkingSlots: state.parkingSlots
    }
)

export default connect(mapStateToProps,{GetAllParkingSlots})(ParkingSlot);
