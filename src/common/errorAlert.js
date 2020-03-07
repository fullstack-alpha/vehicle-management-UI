import React from "react";
import {Alert} from 'reactstrap';
export default function errorAlert(props) {
  return (
      <Alert color="danger">
          {props.message}</Alert>
  );
}
