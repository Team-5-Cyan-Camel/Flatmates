import React from "react";
import axios from "axios";
import UserData from "./UserData";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

const Room = ({ update, room }) => {
  useEffect(() => {
    console.log(room);
  }, []);

  return (
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
          Members
        </Card.Header>

        <Card.Body
          style={{
            display: "Flex",
            alignItems: "center",
            justifyContent: "center",
            width: "90%",
          }}
        >
          {room.users.map((e) => {
            return <UserData data={e} />;
          })}
        </Card.Body>
      </Card>
    </>
  );
};

export default Room;
