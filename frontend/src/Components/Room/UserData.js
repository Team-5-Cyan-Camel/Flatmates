import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTimes as Cross } from "react-icons/fa";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { socket } from "../../Context/socketContext";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const UserData = ({ data, isHost, hostId, yourId }) => {
  const kickMember = (username) => {
    confirmAlert({
      title: "Kicking User",
      message: "Are you sure you want to kick " + username + "?",
      buttons: [
        {
          label: "Ok",
          onClick: () => {
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
          },
        },
        {
          label: "Cancel",
        },
      ],
    });
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
          {data.name}
          {data._id === yourId && " (You)"}{" "}
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
