import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTimes as Cross } from "react-icons/fa";
import styles from "./RosterModal.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

const modalRoot = document.querySelector("#modal-root");

const AddRoster = ({ show }) => {
  let [chore, setChore] = useState("");

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
                class="TaskInputField"
                type="text"
                name="Chore"
                placeholder="Chore"
                value={chore}
                onChange={(e) => setChore(e.target.value)}
              />
              <br></br>
            </form>
            <Button className="GoButton">Create Roster</Button>
          </Card.Body>
        </Card>
      </div>
    </div>,
    modalRoot
  );
};

export default AddRoster;
