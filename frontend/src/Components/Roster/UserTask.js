import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import AddTask from "./AddTask";
import { FaTimes as Cross } from "react-icons/fa";
import axios from "axios";

import { FaPlusCircle as PlusSymbol } from "react-icons/fa";

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
      .then((res) => {})
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Card
        id="Card-field"
        className="UsersTasks"
        style={{
          alignItems: "center",

          width: "20em",
          maxHeight: "100%",
          margin: "1em",
          height: "100%",
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
            borderLeft: "#454549 solid 1px",
            borderRight: "#454549 solid 1px",
            display: "flex",
            flexDirection: "column",

            alignItems: "flex-start",

            height: "100%",
            width: "100%",
            overflowY: "auto",
            backgroundColor: "#7e828b",
          }}
        >
          {task.map((e) => {
            return (
              <Card
                id="Card-field"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  outline: "black solid 1px",
                  margin: "0.25em",
                  borderRadius: "0",
                  width: "100%",
                }}
              >
                <Card.Body
                  style={{
                    alignItems: "center",

                    width: "100%",
                    outlineColor: "black",

                    display: "flex",
                    overflowX: "hidden",
                  }}
                >
                  <p>
                    <Cross onClick={() => deleteTask(e._id)} />
                    {e.title} {": "}{" "}
                    {e.description === "" ? "N/A" : e.description}
                  </p>
                </Card.Body>
              </Card>
            );
          })}
        </Card.Body>
        <Card.Footer id="Card-Footer">
          <Button
            className="CardButton text-center"
            onClick={() => setMakeTask(true)}
            style={{ verticalAlign: "middle" }}
          >
            <PlusSymbol style={{ verticalAlign: "middle" }}></PlusSymbol>
          </Button>
        </Card.Footer>
      </Card>

      {makeTask && (
        <AddTask show={setMakeTask} rid={rid} pid={pid} updateDb={updateDb} />
      )}
    </>
  );
};

export default UserTask;
