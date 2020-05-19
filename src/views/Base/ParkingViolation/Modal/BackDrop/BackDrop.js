import React from 'react';
import './BackDrop.css'

const backDrop = (props) => {
    console.log('Back drop '+props.show)
    return (
        props.show ? <div className='BackDrop' onClick={props.clicked}></div> : null
    )
}

export default backDrop;
