import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Modal, ModalBody, ModalFooter, ModalHeader, Input, Button, Label, FormGroup, Card, Col, CardBody, CardHeader } from 'reactstrap';
import data from './parkingSlotList.json';
import { useSelector, useDispatch } from 'react-redux';
import { GetAllParkingSlots } from '../../Actions/ParkingSlotAction';
import Axios from 'axios'

export default function ParkingSlots() {

    let [reserved, isReserved] = useState(false);
    let [showModal, setModalView] = useState(false);
    let [selectedZone, setClickedZone] = useState({});
    let [clickedSlot, setClickedSlot] = useState({});
    let [addZone, setAddZone] = useState(false);
    let [editZone, setEditZone] = useState(false);

    let [zoneName, setZoneName] = useState(null);
    let [zoneId, setZoneId] = useState(null);
    let [carParkingslots, setCarParkingSlotCount] = useState(null);
    let [bikeParkingslots, setBikeParkingSlotCount] = useState(null);
    let [errorModal, displayErrorModal] = useState(false);
    let [errorMessage, setErrorMessage] = useState({});
    let [bookedSlots, setBookedSlots] = useState([]);


    const dispatch = useDispatch();
    const getParkingSlots = () => dispatch(GetAllParkingSlots());
    useEffect(() => {
        setBookedSlots([])
        getParkingSlots();
        Axios.get("http://localhost:8080/user/reserveFeasibility").then(response => {
            setBookedSlots(response.data)
        })
    },[reserved]);

    let parkingSlots = useSelector(state => state.parkingSlots);
    const auth = useSelector(state => state.auth);

    const isAdmin = () => {
        return auth.user.scopes[0].authority.toLowerCase() === 'admin';
    }

    const setModalContent = (parkingZone, slot) =>{
        return(
            <Modal isOpen={showModal} className={'modal-lg '}>
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

    const errorModalComponent = () =>{
        return(
            <Modal isOpen={errorModal} className={'modal-danger '}>
                <ModalHeader>{errorMessage.messageHeader}</ModalHeader>
                <ModalBody>
                    {errorMessage.messageBody}
                </ModalBody>
                <ModalFooter>
                <Button color="danger" onClick={()=>displayErrorModal(!errorModal)}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

    const addOrEditSlots = () => {
        return(
            <>
            <Modal isOpen={addZone} className={'modal-lg '}>
                <ModalBody>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <strong>Add new Zone</strong>
                            </CardHeader>
                        <CardBody>
                            <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Label htmlFor="zoneName">Zone Name</Label>
                                        <Input type="text" id="zoneName" onChange={(event)=> setZoneName(event.target.value)} placeholder="Enter zone name" required />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <div id="vehicleTypes">
                                <Row>
                                    <Col xs="3">
                                        <FormGroup>
                                            <Label htmlFor="vehicleType">Vehicle type</Label>
                                            <Input type="text" disabled name="vehicleType" value="Car" id="car"/>
                                            <br></br>
                                            <Input type="text" disabled name="vehicleType" value="Bike" id="bike"/>
                                            </FormGroup>
                                    </Col>
                                    <Col xs="3">
                                        <FormGroup>
                                            <Label htmlFor="slots">Number of slots</Label>
                                            <Input type="text" name="slots" onChange={(event)=>setCarParkingSlotCount(event.target.value)} placeholder="Enter no of slots" id="carSlots"/>
                                            <br></br>
                                            <Input type="text" name="slots" onChange={(event)=> setBikeParkingSlotCount(event.target.value)} placeholder="Enter no of slots" id="bikeSlots"/>
                                    </FormGroup>
                                    </Col>
                                </Row>
                            </div>

                        </CardBody>
                        </Card>
                    </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={() => addNewZone()}>Confirm</Button>
                <Button color="secondary" onClick={() => setAddZone(!addZone)}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={editZone} className={'modal-lg '}>
            <ModalBody>
            <Row>
                <Col>
                    <Card>
                    <CardHeader>
                        <strong>Edit {selectedZone.zoneName} Zone</strong>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="zoneName">Zone Name</Label>
                                    <Input type="text" value={selectedZone.zoneName} disabled/>
                                    <Input id="zoneID" type="hidden" value={selectedZone.zoneID}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <div id="vehicleTypes">
                            <Row>
                                <Col xs="3">
                                    <FormGroup>
                                        <Label htmlFor="vehicleType">Vehicle type</Label>
                                        <Input type="text" disabled name="vehicleType" value="Car" id="car"/>
                                        <br></br>
                                        <Input type="text" disabled name="vehicleType" value="Bike" id="bike"/>
                                        </FormGroup>
                                </Col>
                                <Col xs="3">
                                    <FormGroup>
                                        <Label htmlFor="slots">Number of slots</Label>
                                        <Input type="text" name="slots" onChange={(event)=>setCarParkingSlotCount(event.target.value)} placeholder="Enter no of slots" id="carSlots"/>
                                        <br></br>
                                        <Input type="text" name="slots" onChange={(event)=> setBikeParkingSlotCount(event.target.value)} placeholder="Enter no of slots" id="bikeSlots"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>

                    </CardBody>
                    </Card>
                </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={() => editCurrentZone()}>Confirm</Button>
            <Button color="secondary" onClick={() => {setEditZone(!editZone); setZoneId(null)}}>Cancel</Button>
            </ModalFooter>
        </Modal>
        </>
        )
    }

    const isEmployeeBookedSlot = (zoneId ,slotID) => {
        return bookedSlots.some(bookedSlot => bookedSlot.slotId === slotID && bookedSlot.zoneId === zoneId);
    }

    const editCurrentZone = () => {
        const totalParkingSlots = [];
        for (let i = 0; i < carParkingslots; i++) {
            totalParkingSlots.push(
                {
                    "slotDisplayIcon": "fa fa-automobile",
                    "booked": false
                }
            )
        }
        for (let i = 0; i < bikeParkingslots; i++) {
            totalParkingSlots.push(
                {
                    "slotDisplayIcon": "fa fa-bicycle",
                    "booked": false
                }
            )
        }
        saveZone({
            "zoneID": zoneId,
            "parkingSlots": totalParkingSlots
        });

        setEditZone(false);
        setCarParkingSlotCount(null);
        setBikeParkingSlotCount(null);
        setZoneId(null);
        setZoneName(null);
    }

    const addNewZone = () => {
        const totalParkingSlots = [];
        for (let i = 0; i < carParkingslots; i++) {
            totalParkingSlots.push(
                {
                    "slotDisplayIcon": "fa fa-automobile",
                    "booked": false
                }
            )
        }
        for (let i = 0; i < bikeParkingslots; i++) {
            totalParkingSlots.push(
                {
                    "slotDisplayIcon": "fa fa-bicycle",
                    "booked": false
                }
            )
        }
        saveZone({
            "zoneName": zoneName,
            "parkingSlots": totalParkingSlots
        });

        setAddZone(false);
        setCarParkingSlotCount(null);
        setBikeParkingSlotCount(null);
        setZoneId(null);
        setZoneName(null);
    }

    const saveZone = (data) => {
        Axios.post("http://localhost:8080/admin/parkingSlot", data).then(response=> isReserved(!reserved))
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
        // Axios.post("http://localhost:8080/user/confirmBooking", {"zoneID":zoneID, "slotID": slotID})
        // .then(reponse => isReserved(!reserved))

        Axios.get("http://localhost:8080/user/reserveFeasibility").then(response => {
            if(isAdmin() || (!isAdmin() && response.data.length === 0) || (!isAdmin() && !response.data[0].active)){
                setBookedSlots(response.data)
                Axios.post("http://localhost:8080/user/confirmBooking", {"zoneID":zoneID, "slotID": slotID})
                .then(res => isReserved(!reserved))
            }else {
                displayErrorModal(!errorModal);
                setErrorMessage({"messageHeader": "Unable to complete booking", "messageBody":"You've already booked a slot. Try again tomorrow"})
            }
        }).catch(error => {
            if(isAdmin()){
                Axios.post("http://localhost:8080/user/confirmBooking", {"zoneID":zoneID, "slotID": slotID})
                .then(res => isReserved(!reserved))
            }else {
                displayErrorModal(!errorModal);
                setErrorMessage({"messageHeader": "Unable to complete booking", "messageBody":"Server error"})
            }
        })

    }

    const setSlotsIntoView = () => {
        return (
            parkingSlots.parkingSlots.map(parkingZone => (
                        <Row>
                            <nav key={parkingZone.zoneID} class="parking-zone" aria-label="pagination">
                                <h6>{parkingZone.zoneName} Zone
                                {isAdmin() ?
                                <span style={{"padding-left":"10px"}}>
                                    <Button onClick={()=>{setEditZone(!editZone); setClickedZone(parkingZone); setZoneId(parkingZone.zoneID)}}>
                                        <i class="fa fa-edit"></i>
                                    </Button>
                                </span> : ''}
                                </h6>
                                <ul class="pagination parking">
                                    {
                                    parkingZone.parkingSlots.map(slot => (
                                        <li onClick={() => bookSlot(parkingZone,slot)} key={parkingZone.zoneID+"-"+slot.slotID} class={slot.booked
                                        ? isEmployeeBookedSlot(parkingZone.zoneID,slot.slotID) ? 'booked-my-booking disabled' : 'booked disabled' : ''}>
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
                    <Col xs="12" sm="6" className="avail-grp">
                        <h5 class="availability-inner"><div class="availability-icon available"></div><span class="availability-text">Available </span></h5>
                        <h5 class="availability-inner"><div class="availability-icon un-available"></div><span class="availability-text">Unavailable</span></h5>
                        <h5 class="availability-inner"><div class="availability-icon my-booking"></div><span class="availability-text">My Booking</span></h5>
                    </Col>
                    { isAdmin() ?
                    <Col xs="12" sm="6" className="add-zone">
                        <Button color="success" onClick={()=>setAddZone(!addZone)}><i class="fa fa-plus"></i> Zone</Button>
                    </Col> : ''}
                </div>
            </Row>
                {
                    setSlotsIntoView()
                }
                {
                    setModalContent(selectedZone, clickedSlot)
                }
                {
                    isAdmin() ? addOrEditSlots() : ''
                }
                {
                    errorModalComponent()
                }
        </Container>
    )
}
