import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { FaTimes as Cross } from "react-icons/fa";

const UserData = ({ data, isHost, hostId }) => {
  console.log(data);
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
          {data.name} {isHost && hostId !== data._id && <Cross />}
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
