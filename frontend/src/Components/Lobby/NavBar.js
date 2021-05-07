import { Link, useHistory, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../Context/socketContext";

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
      <nav class="topnav" style={{ display: "flex" }}>
        {/* list for features */}
        <ul>
          <a>
            <Link to={"/room/" + code + "/users"}>Room</Link>
          </a>

          <a>
            <Link to={"/room/" + code + "/roster"}>Roster</Link>
          </a>
        </ul>

        {/* list for actions */}
        <ul style={{ marginLeft: "3rem" }}>
          <Button className="navbutton" onClick={() => setSettings(true)}>
            Settings
          </Button>

          {isHost ? (
            <Button className="navbutton" onClick={deleteRoom}>
              Delete Room
            </Button>
          ) : (
            <Button className="navbutton" onClick={leave}>
              Leave Room
            </Button>
          )}
          <Button className="navbutton" onClick={signOut}>
            Sign Out
          </Button>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
