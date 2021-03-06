import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import AddTask from "./AddTask";
import { FaTimes as Cross } from "react-icons/fa";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { FaPlusCircle as PlusSymbol } from "react-icons/fa";

import Button from "react-bootstrap/Button";

const UserTask = ({ task, name, rid, pid }) => {
  let [makeTask, setMakeTask] = useState(false);
  const deleteTask = (id) => {
    confirmAlert({
      title: "Deleting Task",
      message: "Are you sure you want to delete this task",
      buttons: [
        {
          label: "Ok",
          onClick: () => {
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
        className="UsersTasks"
        style={{
          alignItems: "center",
          width: "19em",
          maxHeight: "100%",
          margin: "0.5em",
          height: "47vh",
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
          {task.map((e, i) => {
            return (
              <Card
                id="Card-field"
                key={i}
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

      {makeTask && <AddTask show={setMakeTask} rid={rid} pid={pid} />}
    </>
  );
};

export default UserTask;
