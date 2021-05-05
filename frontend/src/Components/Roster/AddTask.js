import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTimes as Cross } from "react-icons/fa";
import styles from "./AddTask.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

const modalRoot = document.querySelector("#modal-root");

const AddTask = ({ show }) => {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [dueType, setDueType] = useState("");
  let [due, setDue] = useState("");

  return ReactDOM.createPortal(
    <div className={styles.modalContainer}>
      <div className={styles.form}>
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
          >
            <form>
              <input
                class="TaskInputField"
                type="text"
                name="Title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br></br>
              <input
                class="TaskInputField"
                type="text"
                name="Description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <br></br>
              <input
                class="TaskInputField"
                type="text"
                name="DueType"
                placeholder="Due Type"
                value={dueType}
                onChange={(e) => setDueType(e.target.value)}
              />
              <br></br>
              <input
                class="TaskInputField"
                type="text"
                name="Due"
                placeholder="Due"
                value={due}
                onChange={(e) => setDue(e.target.value)}
              />
              <br></br>
            </form>
            <Button className="GoButton">Create Task</Button>
          </Card.Body>
        </Card>
      </div>
    </div>,
    modalRoot
  );
};

export default AddTask;
