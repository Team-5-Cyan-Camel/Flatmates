import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import AddTask from "./AddTask";
import { FaTimes as Cross } from "react-icons/fa";
import axios from "axios";

import Button from "react-bootstrap/Button";

const UserTask = ({ task, name, rid, pid, updateDb }) => {
  let [makeTask, setMakeTask] = useState(false);

  const deleteTask = (id) => {
    const delTask = {
      rosterID: rid,
      taskID: id,
    };

    axios
      .delete("/roster/task", { data: delTask })
      .then((res) => {
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
            return (
              <p>
                <Cross onClick={() => deleteTask(e._id)} />
                {e.title}
              </p>
            );
          })}

          <Button className="GoButton" onClick={() => setMakeTask(true)}>
            Add Task
          </Button>
        </Card.Body>
      </Card>

      {makeTask && (
        <AddTask show={setMakeTask} rid={rid} pid={pid} updateDb={updateDb} />
      )}
    </>
  );
};

export default UserTask;
