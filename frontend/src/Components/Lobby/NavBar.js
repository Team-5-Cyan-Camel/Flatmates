import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../Context/socketContext";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const NavBar = ({ setSettings, setUpdate, isHost }) => {
  const history = useHistory();
  const { code } = useParams();
  const socket = useContext(SocketContext);

  useEffect(() => {
    setUpdate();
    socket.emit("enter_room", { roomID: code });
  }, []);

  const leave = () => {
    axios
      .patch("/room/leave")
      .then((res) => {
        history.push("/code");
      })
      .catch(function (error) {
        console.log(error);
      });
    socket.emit("leave_room", { roomID: code });
  };

  const deleteRoom = () => {
    // console.log("Delete");
    axios
      .delete("/room")
      .then((res) => {
        console.log(res);
        history.push("/code");
      })
      .catch(function (error) {
        console.log(error);
      });
    socket.emit("leave_room", { roomID: code });
  };

  const signOut = () => {
    // remove any cached content, return to main room
    // console.log("signOut");
    axios
      .post("/user/logout")
      .then((res) => {
        history.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
    socket.emit("leave_room", { roomID: code });
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Link to={"/room/" + code}>Room</Link>

          <Nav.Link to={"/room/" + code}>test</Nav.Link>
          <Nav.Link href="#Roster">Roster</Nav.Link>
          <Link to={"/room/" + code + "/roster"}>Roster</Link>
          <Link to={"/room/" + code + "/message"}>Message</Link>
        </Nav>

        <Button
          className="GoButton"
          style={{ margin: "0" }}
          onClick={() => setSettings(true)}
        >
          Settings
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
          Sign Out
        </Button>
      </Navbar>
    </>
  );
};

export default NavBar;
