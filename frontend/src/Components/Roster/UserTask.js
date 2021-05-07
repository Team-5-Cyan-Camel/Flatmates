import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import AddTask from "./AddTask";

import Button from "react-bootstrap/Button";

const UserTask = ({ task, name, rid, pid }) => {
  let [makeTask, setMakeTask] = useState(false);
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
          {name}
        </Card.Header>

        <Card.Body
          style={{
            display: "Grid",
            alignItems: "center",
            justifyContent: "center",
            width: "90%",
          }}
        >
          {task.map((e) => {
            return <p>{e.title}</p>;
          })}

          <Button className="GoButton" onClick={() => setMakeTask(true)}>
            Add Task
          </Button>
        </Card.Body>
      </Card>

      {makeTask && <AddTask show={setMakeTask} rid={rid} pid={pid} />}
    </>
  );
};

export default UserTask;
