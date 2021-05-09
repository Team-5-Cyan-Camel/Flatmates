import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "../Lobby/NavBar.css";
import AddRoster from "./AddRoster";
import { useState, useEffect } from "react";
import { FaTimes as Cross } from "react-icons/fa";

import axios from "axios";
import "../Lobby/NavBar.css";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";

import { FaPlusCircle as PlusSymbol } from "react-icons/fa";

const SelectRoster = ({ rosters, setRoster, updateDb, isHost }) => {
  let [makeRoster, setMakeRoster] = useState(false);

  const deleteRoster = (id) => {
    const rostDel = {
      rosterID: id,
    };

    axios
      .delete("/roster", { data: rostDel })
      .then((res) => {})
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {/* {rosters !== "undefined" && ( */}

      <Navbar bg="dark" variant="dark" style={{}}>
        <Nav className="mr-auto">
          {rosters !== null &&
            rosters.rosters.map((e, i) => [
              <Nav.Link
                key={i}
                onClick={() => setRoster(e.title)}
                style={{
                  marginLeft: "0.25em",
                  marginRight: "0.25em",
                }}
              >
                {e.title}{" "}
                {isHost && <Cross onClick={() => deleteRoster(e._id)} />}
              </Nav.Link>,
            ])}

          {/* </div> */}
        </Nav>
        <Button className="NavBarButton" onClick={() => setMakeRoster(true)}>
          <PlusSymbol></PlusSymbol>
        </Button>
      </Navbar>

      {/* )} */}
      {makeRoster && <AddRoster show={setMakeRoster} updateDb={updateDb} />}
    </>
  );
};

export default SelectRoster;
