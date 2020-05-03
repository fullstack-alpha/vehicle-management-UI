import React from 'react';

const passRequestSummary = (props) => {
    let vDetails = null;
    if (props.vehiclePassRequest != null) {
        vDetails =
            <ul style={{
                listStyleType: 'square'
            }}>
                <li><span style={{ fontWeight: 'bold' }}>Employee Id    :</span> {props.vehiclePassRequest.employeeId}</li>
                <li><span style={{ fontWeight: 'bold' }}>Employee Name  : </span>{props.vehiclePassRequest.employeeName}</li>
                <li><span style={{ fontWeight: 'bold' }}>Vehicle Number : </span>{props.vehiclePassRequest.vehicleNumber}</li>
                <li><span style={{ fontWeight: 'bold' }}>Vehicle Type   : </span>{props.vehiclePassRequest.vehicleType}</li>
                <li><span style={{ fontWeight: 'bold' }}>Request Status :</span> {props.vehiclePassRequest.requestStatus}</li>
            </ul>
    }



    return (
        <div>
            <div className='card-header'>
                <p> Do you want to approve or reject following request?</p>
            </div>
            <div className='card-body'>
                {vDetails}
            </div>
            <div className='card-footer'>
                <button className='btn btn-success btn-sm' onClick={props.buttonClick} value='Approved'>APPROVE</button><button className='btn btn-danger btn-sm' onClick={props.buttonClick} value='Rejected'>REJECT</button>
            </div>
        </div>
    );
}

export default passRequestSummary;