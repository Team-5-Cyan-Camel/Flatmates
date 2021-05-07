import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "../Lobby/NavBar.css";
import AddRoster from "./AddRoster";
import { useState, useEffect } from "react";
import { FaTimes as Cross } from "react-icons/fa";
import axios from "axios";

const SelectRoster = ({ rosters, setRoster, updateDb }) => {
  let [makeRoster, setMakeRoster] = useState(false);

  const deleteRoster = (id) => {
    const rostDel = {
      rosterID: id,
    };

    axios
      .delete("/roster", { data: rostDel })
      .then((res) => {
        updateDb();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {/* {rosters !== "undefined" && ( */}
      <Card
        id="Card-field"
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card.Body
          style={{
            display: "Flex",
            alignItems: "center",
            justifyContent: "center",
            width: "90%",
          }}
        >
          {/* <div class='topnav' style={{display: 'flex'}}> */}
          {rosters !== null &&
            rosters.rosters.map((e, i) => [
              <Button
                key={i}
                className="GoButton"
                onClick={() => setRoster(e.title)}
              >
                {e.title} <Cross onClick={() => deleteRoster(e._id)} />
              </Button>,
            ])}
          <Button className="GoButton" onClick={() => setMakeRoster(true)}>
            Add
          </Button>
          {/* </div> */}
        </Card.Body>
      </Card>
      {/* )} */}
      {makeRoster && <AddRoster show={setMakeRoster} updateDb={updateDb} />}
    </>
  );
};

export default SelectRoster;
