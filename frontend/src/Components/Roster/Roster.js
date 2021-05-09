import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import UserTask from "./UserTask";
import "../../App.css";
import axios from "axios";

import { FaSyncAlt } from "react-icons/fa";

const Roster = ({ data, isHost }) => {
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
            height: "65vh",
            maxHeight: "80vh",
            borderTopRightRadius: "0",
            borderTopLeftRadius: "0",
            width: "100%",
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
            <div></div>
            {data.title}
            {ifHost && (
              <Button className="NavBarButton" onClick={rotate}>
                <FaSyncAlt />
              </Button>
            )}
          </Card.Header>

          <Card.Body
            className="UsersTasksList"
            style={{
              display: "grid",
              gridAutoFlow: "column",
              alignItems: "center",

              overflowX: "auto",
              minWidth: "0",
              width: "100%",
              padding: "1em",
            }}
          >
            {data.assignedUsers.map((e, i) => {
              return (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <UserTask
                    key={i}
                    rid={data._id}
                    pid={e._id}
                    name={e.name}
                    tasks={data.tasks.filter((data) => {
                      return data.userIndex === i;
                    })}
                  />
                </div>
              );
            })}
          </Card.Body>
          <Card.Footer id="Card-Footer"></Card.Footer>
        </Card>
      )}
    </>
  );
};

export default Roster;
