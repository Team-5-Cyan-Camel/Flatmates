import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import UserTask from "./UserTask";
import "../../App.css";
import axios from "axios";

const Roster = ({ data }) => {
  let [inTask, setInTask] = useState(false);

  useEffect(() => {
    console.log(data.assignedUsers);
    axios
      .get("../../user")
      .then((res) => {
        console.log(res.data._id);
        data.assignedUsers.map((e) => {
          if (e._id === res.data._id) {
            console.log("FOUND");
            setInTask(true);
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const addUser = () => {
    // use axios to add a new user
    // this class should always know how many existing users there are?
    // may need to pass it down as aparameter
    console.log(addUser);
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
                  task={data.tasks.filter((data) => {
                    return data.userIndex === i;
                  })}
                />
              );
            })}
            {!inTask && (
              <Button className="GoButton" onClick={addUser}>
                Add Yourself
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
