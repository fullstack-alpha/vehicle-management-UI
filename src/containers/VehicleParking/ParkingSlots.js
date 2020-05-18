import React, { useState, useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import data from './parkingSlotList.json';
import { useSelector, useDispatch } from 'react-redux';
import { GetAllParkingSlots } from '../../Actions/ParkingSlotAction';
import Axios from 'axios'

export default function ParkingSlots() {

    let [reserved, isReserved] = useState(false);
    let [showModal, setModalView] = useState(false);
    let [selectedZone, setClickedZone] = useState({});
    let [clickedSlot, setClickedSlot] = useState({});
    const dispatch = useDispatch();
    const getParkingSlots = () => dispatch(GetAllParkingSlots());
    useEffect(() => {
        getParkingSlots();
    },[reserved]);

    let parkingSlots = useSelector(state => state.parkingSlots);

    const setModalContent = (parkingZone, slot) =>{
        return(
            <Modal isOpen={showModal}
                        className={'modal-lg '}>
                <ModalHeader>Reserve parking slot in {parkingZone.zoneName} zone</ModalHeader>
                <ModalBody className="center-align">
                    
                    <p>{slot.slotDisplayName}</p>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={() => confirmBooking(parkingZone.zoneID, slot.slotID)}>Confirm</Button>
                <Button color="secondary" onClick={() => setModalView(!showModal)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

    const bookSlot = (parkingZone, slot) =>{
        if(slot.booked){
            return;
        } 
        setModalView(true);
        setClickedZone(parkingZone);
        setClickedSlot(slot);
    }

    const confirmBooking = (zoneID, slotID) => {
        setModalView(!showModal);
        Axios.post("http://localhost:8080/user/confirmBooking", {"zoneID":zoneID, "slotID": slotID}).then(reponse => isReserved(!reserved))
    }

    const setSlotsIntoView = () => {
        return (
            parkingSlots.parkingSlots.map(parkingZone => (
                        <Row>
                            <nav key={parkingZone.zoneID} class="parking-zone" aria-label="pagination">
                                <h6>{parkingZone.zoneName} Zone</h6>
                                <ul class="pagination parking">
                                    {
                                    parkingZone.parkingSlots.map(slot => (
                                        <li onClick={() => bookSlot(parkingZone,slot)} key={parkingZone.zoneID+"-"+slot.slotID} class={slot.booked ? 'booked disabled' : ''}>
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

    if (!parkingSlots.parkingSlots) {
        return <span>Loading...</span>;
    }
    
    return (
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
                {
                    setModalContent(selectedZone, clickedSlot)
                }
        </Container>
    )
}
