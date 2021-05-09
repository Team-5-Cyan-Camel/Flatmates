import React from "react";
import axios from "axios";
import UserData from "./UserData";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { socket } from "../../Context/socketContext";
import Spinner from "react-bootstrap/Spinner";

const Room = ({ setIsHost }) => {
  let [isHost, setHost] = useState(false);
  const [room, setRoom] = useState(null);
  const [hostId, setHostId] = useState(null);
  const [yourId, setYourId] = useState(null);

  useEffect(() => {
    axios
      .get("/user")
      .then((res) => {
        console.log(res.data);
        setYourId(res.data._id);
        setIsHost(res.data.isHost);
        setHost(res.data.isHost);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("/room")
      .then((res) => {
        setRoom(res.data);
        setHostId(res.data.host);
      })
      .catch(function (error) {
        console.log(error);
      });
    socket.on("update", () => {
      axios
        .get("/room")
        .then((res) => {
          setRoom(res.data);
          setHostId(res.data.host);
        })
        .catch(function (error) {
          console.log(error);
        });
    });

    socket.emit("update");
  }, []);

  return (
    <>
      <Card
        id="Card-field"
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          maxWidth: "50vh",
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            marginTop: "0 !important",
            marginBottom: "auto !important",

            width: "100%",
            maxHeight: "60vh",
            overflowY: "auto",
            paddingLeft: "1em",
            paddingRight: "1em",
          }}
        >
          {room !== null ? (
            room.users.map((e) => {
              return (
                <UserData
                  data={e}
                  hostId={hostId}
                  isHost={isHost}
                  yourId={yourId}
                />
              );
            })
          ) : (
            <Spinner animation="border" />
          )}
        </Card.Body>

        <Card.Footer id="Card-Footer"></Card.Footer>
      </Card>
    </>
  );
};

export default Room;
