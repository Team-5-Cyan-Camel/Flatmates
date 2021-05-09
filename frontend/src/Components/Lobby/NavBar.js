import { Link, useHistory, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect, useContext } from "react";
import { SocketContext } from "../../Context/socketContext";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

import { FaSignOutAlt } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

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
        <Navbar.Brand id="NavBarToHide">FlatMates</Navbar.Brand>
        <Nav className="mr-auto">
          <div
            class="dropdown"
            id="NavBarToShow"
            style={{ borderRadius: "0", display: "none" }}
          >
            <button
              class="btn btn-secondary"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ width: "10em" }}
            >
              FlatMates <FaBars style={{ marginLeft: "0.25em" }}></FaBars>
            </button>
            <div
              class="dropdown-menu"
              style={{
                width: "100%",
                borderTopRightRadius: "0",
                borderTopLeftRadius: "0",
                backgroundColor: "#4D4D4D",
              }}
              aria-labelledby="dropdownMenuButton"
            >
              {" "}
              <Link to={"/room/" + code}>
                <a class="dropdown-item dropdownTab" style={{ color: "white" }}>
                  Room
                </a>{" "}
              </Link>
              <Link to={"/room/" + code + "/roster"}>
                <a class="dropdown-item dropdownTab" style={{ color: "white" }}>
                  Roster
                </a>
              </Link>{" "}
              <Link to={"/room/" + code + "/message"}>
                <a class="dropdown-item dropdownTab" style={{ color: "white" }}>
                  Message Board
                </a>{" "}
              </Link>
              <div class="dropdown-divider"></div>
              <a
                class="dropdown-item dropdownTabButton"
                style={{ color: "white" }}
                onClick={() => setSettings(true)}
              >
                Personalise
              </a>
              <a
                class="dropdown-item dropdownTab"
                style={{ color: "white" }}
                onClick={() => copyCode()}
              >
                Get Code
              </a>
              {isHost ? (
                <a
                  class="dropdown-item dropdownTab"
                  style={{ color: "white" }}
                  onClick={deleteRoom}
                >
                  Delete Room
                </a>
              ) : (
                <a
                  class="dropdown-item dropdownTab"
                  style={{ color: "white" }}
                  onClick={leave}
                >
                  Leave Room
                </a>
              )}
              <div class="dropdown-divider"></div>
              <a
                class="dropdown-item dropdownTab"
                style={{ color: "white" }}
                onClick={signOut}
              >
                <FaSignOutAlt />
              </a>
            </div>
          </div>

          <Nav.Link id="NavBarToHide">
            <Link style={{ color: "white" }} to={"/room/" + code}>
              Room
            </Link>
          </Nav.Link>
          <Nav.Link id="NavBarToHide">
            <Link style={{ color: "white" }} to={"/room/" + code + "/roster"}>
              Roster
            </Link>
          </Nav.Link>
          <Nav.Link id="NavBarToHide">
            <Link style={{ color: "white" }} to={"/room/" + code + "/message"}>
              Message Board
            </Link>
          </Nav.Link>
        </Nav>

        <Button
          className="NavBarButton"
          id="NavBarToHide"
          style={{ marginLeft: "0.2em" }}
          onClick={() => setSettings(true)}
        >
          Personalise
        </Button>

        <Button
          className="NavBarButton"
          id="NavBarToHide"
          style={{ marginLeft: "0.2em" }}
          onClick={() => copyCode()}
        >
          Get Code
        </Button>

        {isHost ? (
          <Button
            className="NavBarButton"
            id="NavBarToHide"
            style={{ marginLeft: "0.2em" }}
            onClick={deleteRoom}
          >
            Delete Room
          </Button>
        ) : (
          <Button
            className="NavBarButton"
            id="NavBarToHide"
            style={{ marginLeft: "0.2em" }}
            onClick={leave}
          >
            Leave Room
          </Button>
        )}

        <Button
          className="NavBarButton"
          id="NavBarToHide"
          style={{ marginLeft: "0.2em" }}
          onClick={signOut}
        >
          <FaSignOutAlt />
        </Button>
      </Navbar>
    </>
  );
};

export default NavBar;
