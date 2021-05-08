import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTimes as Cross } from "react-icons/fa";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { socket } from "../../Context/socketContext";

const UserData = ({ data, isHost, hostId }) => {
  const kickMember = (username) => {
    const kickUser = {
      username: username,
    };
    axios
      .patch("/room/kick", kickUser)
      .then((res) => {})
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
            display: "Flex",
            alignItems: "center",
            justifyContent: "center",
            width: "90%",
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
