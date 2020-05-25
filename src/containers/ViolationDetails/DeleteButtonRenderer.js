import React, { Component } from 'react';
import axios from 'axios';
export default class DeleteButtonRenderer extends Component {
	constructor(props) {
    super(props);
	this.buttonClick = this.buttonClick.bind(this);
  }
  buttonClick= (e) => {
        let deletedRow = this.props.node.data;
        var id = deletedRow.violationId;
        let url = 'http://localhost:8080/parkingViolation/delete/'+ id;


        axios.delete(url)
            .then((response) => {
                e.gridApi.updateRowData({ remove: [deletedRow] })  ;
            });
        
  }
    render() {
        return (
            <span><button className="btn btn-info" style={{ height: 20, lineHeight: 0.5 }} onClick={() => {this.buttonClick(this.props.node)}}>X</button></span>
        );
    }
}