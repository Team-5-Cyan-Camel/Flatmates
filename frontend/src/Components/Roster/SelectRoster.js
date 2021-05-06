import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "../Lobby/NavBar.css";
import AddRoster from "./AddRoster";
import { useState } from "react";

const SelectRoster = ({ rosters, setRoster, updateDb }) => {
  let [makeRoster, setMakeRoster] = useState(false);

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
                {e.title}
              </Button>,
            ])}
          <Button className="GoButton" onClick={() => setMakeRoster(true)}>
            Add+
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
