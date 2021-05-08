import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import UserTask from "./UserTask";
import "../../App.css";
import axios from "axios";

const Roster = ({ data, updateDb, isHost }) => {
  let [ifHost, setIsHost] = useState(isHost);

  const rotate = () => {
    const rotateRep = {
      rosterID: data._id,
    };

    axios
      .patch("/roster/rotate", rotateRep)
      .then((res) => {})
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      {data !== "undefined" && (
        <Card
          id="Card-field"
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
            maxHeight: "70vh",
            borderTopRightRadius: "0",
            borderTopLeftRadius: "0",
          }}
        >
          <Card.Header
            as="h5"
            id="Card-Header"
            className="text-center"
            style={{
              width: "100%",
              borderTopRightRadius: "0",
              borderTopLeftRadius: "0",
              alignItems: "center",
              justifyContent: "center",
              display: "grid",
              gridTemplateColumns: "1fr 7fr 1fr",
            }}
          >
            <div></div> asdasd
            {data.title}
            {ifHost && (
              <Button
                className="GoButton"
                style={{ margin: "0" }}
                onClick={rotate}
              >
                rotate
              </Button>
            )}
          </Card.Header>

          <Card.Body
            style={{
              display: "Flex",
              alignItems: "flex-start",
              justifyContent: "center",
              width: "90%",
              maxHeight: "100%",
            }}
          >
            {data.assignedUsers.map((e, i) => {
              return (
                <UserTask
                  key={i}
                  rid={data._id}
                  pid={e._id}
                  name={e.name}
                  updateDb={updateDb}
                  task={data.tasks.filter((data) => {
                    return data.userIndex === i;
                  })}
                />
              );
            })}
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Roster;
