import React from "react";
import ReactDOM from "react-dom";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

const modalRoot = document.querySelector("#modal-root");

const AddTask = () => {
  return ReactDOM.createPortal(
    <>
      <Card
        id="Card-field"
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card.Header
          as="h5"
          id="Card-Header"
          className="text-center"
          style={{ width: "100%" }}
        >
          {" "}
          Settings
        </Card.Header>

        <Card.Body
          style={{
            display: "Grid",
            alignItems: "center",
            justifyContent: "center",
            width: "90%",
          }}
        ></Card.Body>
      </Card>
    </>,
    modalRoot
  );
};

export default AddTask;
