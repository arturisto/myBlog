import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
export default function modal(props) {
  const type = props.modalType;
  const showStatus = props.showStatus;
  const title = props.modalTitle;
  const text = props.modalText;


  return (
    <Modal show={showStatus}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{text}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={()=>props.onConfirm(type)}>
          Confirm
        </Button>
        {type !== "error" ? (
          <Button variant="info" onClick={()=>props.onDeny()}>
            Deny
          </Button>
        ) : (
          ""
        )}
      </Modal.Footer>
    </Modal>
  );
}
