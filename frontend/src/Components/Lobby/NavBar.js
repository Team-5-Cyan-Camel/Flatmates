import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../Context/socketContext";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { FaCog as Cog } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

import { SocketContext } from "../../Context/socketContext";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const NavBar = ({ setSettings, setUpdate, isHost }) => {
  const history = useHistory();
  const { code } = useParams();
  const socket = useContext(SocketContext);

  useEffect(() => {
    setUpdate();
    socket.emit("enter_room", { roomID: code });
    return () => {
      console.log("left room");
      socket.emit("leave_room", { roomID: code });
    };
  }, []);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    confirmAlert({
      title: "Room Code",
      message: "Copied: " + code + " to clipboard",
      buttons: [
        {
          label: "Ok",
        },
      ],
    });
  };

  const leave = () => {
    confirmAlert({
      title: "Leaving Room",
      message: "Are you sure you want to leave this room",
      buttons: [
        {
          label: "Ok",
          onClick: () => {
            axios
              .patch("/room/leave")
              .then((res) => {
                history.push("/code");
              })
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

  const deleteRoom = () => {
    confirmAlert({
      title: "Deleting Room",
      message: "Are you sure you want to delete this room",
      buttons: [
        {
          label: "Ok",
          onClick: () => {
            axios
              .delete("/room")
              .then((res) => {
                console.log(res);
                history.push("/code");
              })
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

  const signOut = () => {
    axios
      .post("/user/logout")
      .then((res) => {
        history.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="home">FlatMates</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to={"/room/" + code}>Room</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to={"/room/" + code + "/roster"}>Roster</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to={"/room/" + code + "/message"}>Message Board</Link>
          </Nav.Link>
        </Nav>

        <Button
          className="GoButton"
          style={{ margin: "0" }}
          onClick={() => copyCode()}
        >
          Get Code
        </Button>

        <Button
          className="GoButton"
          style={{ margin: "0" }}
          onClick={() => setSettings(true)}
        >
          Personalise
        </Button>

        {isHost ? (
          <Button
            className="GoButton"
            style={{ margin: "0" }}
            onClick={deleteRoom}
          >
            Delete Room
          </Button>
        ) : (
          <Button className="GoButton" style={{ margin: "0" }} onClick={leave}>
            Leave Room
          </Button>
        )}

        <Button className="GoButton" style={{ margin: "0" }} onClick={signOut}>
          <FaSignOutAlt />
        </Button>
      </Navbar>
    </>
  );
};

export default NavBar;
