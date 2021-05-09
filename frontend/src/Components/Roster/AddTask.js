import React, { useState } from "react";
import ReactDOM from "react-dom";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTimes as Cross } from "react-icons/fa";
import styles from "./RosterModal.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import axios from "axios";

const modalRoot = document.querySelector("#modal-root");

const AddTask = ({ show, rid, pid }) => {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");

  const makeTask = () => {
    const newTask = {
      title: title,
      description: description,
      rosterID: rid,
      assignedUserID: pid,
    };

    axios
      .post("/roster/task", newTask)
      .then((res) => {
        show(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return ReactDOM.createPortal(
    <div
      className={styles.modalContainer}
      style={{ display: "flex", alignItems: "center" }}
    >
      <div></div>
      <div
        className={styles.form}
        style={{
          width: "90%",
          maxWidth: "60em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          id="Card-field"
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "95%",
            maxWidth: "25em",
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
            id="Card-Body"
            style={{
              display: "Grid",
              alignItems: "center",
              justifyContent: "center",
              width: "90%",
            }}
          >
            <form>
              <input
                className="AccountInputField"
                type="text"
                name="Title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br></br>
              <input
                className="AccountInputField"
                type="text"
                name="Description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <br></br>
            </form>
            <Button className="GoButton" onClick={makeTask}>
              Create Task
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>,
    modalRoot
  );
};

export default AddTask;
