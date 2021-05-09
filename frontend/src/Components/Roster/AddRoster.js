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

const AddRoster = ({ show }) => {
  let [chore, setChore] = useState("");

  const addRoster = () => {
    if (chore === "") {
      return;
    }
    const addRos = {
      title: chore,
    };

    axios
      .post("/roster", addRos)
      .then((res) => {
        show(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return ReactDOM.createPortal(
    <div
      style={{ display: "flex", alignItems: "center" }}
      className={styles.modalContainer}
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
            Add Roster <Cross onClick={() => show(false)} />
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
                className="AccountInputField"
                type="text"
                name="Chore"
                placeholder="Chore"
                value={chore}
                onChange={(e) => setChore(e.target.value)}
              />
              <br></br>
            </form>
            <Button className="GoButton" onClick={addRoster}>
              Create Roster
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>,
    modalRoot
  );
};

export default AddRoster;
