import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import UserTask from "./UserTask";
import "../../App.css";
import axios from "axios";

const Roster = ({ data, updateDb }) => {
  let [isHost, setIsHost] = useState(false);

  useEffect(() => {
    axios
      .get("/user")
      .then((res) => {
        setIsHost(res.data.isHost);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const rotate = () => {
    const rotateRep = {
      rosterID: data._id,
    };

    axios
      .patch("/roster/rotate", rotateRep)
      .then((res) => {
        console.log(res);
        updateDb();
      })
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
          }}
        >
          <Card.Header
            as="h5"
            id="Card-Header"
            className="text-center"
            style={{ width: "100%" }}
          >
            {" "}
            {data.title}
          </Card.Header>

          <Card.Body
            style={{
              display: "Flex",
              alignItems: "center",
              justifyContent: "center",
              width: "90%",
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
            {isHost && (
              <Button className="GoButton" onClick={rotate}>
                Rotate Task!
              </Button>
            )}
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Roster;

// data.tasks.filter((data) => {
//     return data.userIndex === 0;
//   });
