import React from "react";
import ReactDOM from "react-dom";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTimes as Cross } from "react-icons/fa";
import styles from "./AddTask.module.css";

const modalRoot = document.querySelector("#modal-root");

const AddTask = ({ show }) => {
  return ReactDOM.createPortal(
    <div className={styles.modalContainer}>
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
          Add Task <Cross onClick={() => show(false)} />
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
    </div>,
    modalRoot
  );
};

export default AddTask;
