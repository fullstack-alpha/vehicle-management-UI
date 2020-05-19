import React from 'react';

const ParkingViolationSummary = (props) => {
    let vDetails = null;
    if (props.userViolationDetail != null) {
        vDetails =
            <ul style={{
                listStyleType: 'square'
            }}>
                <li><span style={{ fontWeight: 'bold' }}>Employee Id    :</span> {props.userViolationDetail.employeeId}</li>
                <li><span style={{ fontWeight: 'bold' }}>Employee Name  : </span>{props.userViolationDetail.employeeName}</li>
                <li><span style={{ fontWeight: 'bold' }}>Vehicle Number : </span>{props.userViolationDetail.vehicleNo}</li>
                <li><span style={{ fontWeight: 'bold' }}>Date of Offence   : </span>{props.userViolationDetail.dateOfOffence}</li>
                <li><span style={{ fontWeight: 'bold' }}>Remarks :</span> {props.userViolationDetail.remarks}</li>
            </ul>
    }



    return (
        <div>
            <div className='card-body'>
                {vDetails}
            </div>
        </div>
    );
}

export default ParkingViolationSummary;