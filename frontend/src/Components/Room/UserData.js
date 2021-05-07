import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { FaTimes as Cross } from "react-icons/fa";
import axios from "axios";

const UserData = ({ data, isHost, hostId }) => {
  const kickMember = (username) => {
    console.log("KICLKK");
    console.log(data);
    console.log(username);
    const kickUser = {
      username: username,
    };
    axios
      .patch("/room/kick", kickUser)
      .then((res) => {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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
          <p>Phone Number: {data.phoneNumber}</p>
          <p>Email: {data.email}</p>
        </Card.Body>
      </Card>
    </>
  );
};

export default UserData;
