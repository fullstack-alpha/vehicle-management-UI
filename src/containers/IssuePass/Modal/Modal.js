import React from 'react';
import './Modal.css';
import BackDrop from './BackDrop/BackDrop';

const modal = (props) => {

    return (
        <div>
            <BackDrop show={props.modelClicked} clicked={props.cancelViewDetailsHandler}/>
            <div className='Modal' style={
                {
                    transform: props.modelClicked ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.modelClicked ? 1 : 0
                }
            }>
                {props.children}
            </div>
        </div>
    );
}

export default modal;