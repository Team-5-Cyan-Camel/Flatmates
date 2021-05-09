import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { FaTimes as Cross } from "react-icons/fa";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { socket, SocketContext } from "../../Context/socketContext";

const UserData = ({ data, isHost, hostId }) => {
  const kickMember = (username) => {
    // console.log("KICLKK");
    // console.log(data);
    // console.log(username);
    const kickUser = {
      username: username,
    };
    axios
      .patch("/room/kick", kickUser)
      .then((res) => {
        // console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    socket.emit("update");
  };
  return (
    <>
      <Card
        id="Card-field"
        style={{
          alignItems: "center",
          justifyContent: "center",
          margin: "1em",
          width: "90%",
          backgroundColor: "#7e828b",
        }}
      >
        <Card.Header
          as="h5"
          id="Card-Header"
          className="text-center"
          style={{ width: "100%" }}
        >
          {" "}
          {data.name}{" "}
          {isHost && hostId !== data._id && (
            <Cross onClick={() => kickMember(data.username)} />
          )}
        </Card.Header>

        <Card.Body
          style={{
            alignItems: "start",
            justifyContent: "start",
            width: "100%",
          }}
        >
          <Form>
            <p>Number: {data.phoneNumber === "" ? "N/A" : data.phoneNumber}</p>
            <br></br>
            <p>Email: {data.email === "" ? "N/A" : data.email}</p>
            <br></br>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default UserData;
