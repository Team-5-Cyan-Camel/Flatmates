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

const AddRoster = ({ show, updateDb }) => {
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
                className="TaskInputField"
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
