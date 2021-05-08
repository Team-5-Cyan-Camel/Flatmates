import React from "react";
import axios from "axios";
import UserData from "./UserData";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { socket, SocketContext } from "../../Context/socketContext";

const Room = ({ update, room, setIsHost, hostId }) => {
  let [isHost, setHost] = useState(false);
  // console.log(room);
  // console.log(room.users);
  useEffect(() => {
    axios
      .get("/user")
      .then((res) => {
        // console.log(res.data);
        setIsHost(res.data.isHost);
        setHost(res.data.isHost);
      })
      .catch(function (error) {
        console.log(error);
      });
    socket.emit("update");
  }, []);

  return (
    <>
      {/* <Card
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
          {room !== null &&
            room.users.map((e) => {
              return <UserData data={e} hostId={hostId} isHost={isHost} />;
            })}
        </Card.Body>
      </Card> */}
    </>
  );
};

export default Room;
