import { Link, useHistory, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState, useEffect } from "react";

const NavBar = ({ setSettings, setUpdate }) => {
  const history = useHistory();
  const { code } = useParams();

  useEffect(() => {
    setUpdate();
  }, []);

  const leave = () => {
    // ask for confirmation
    // console.log("leave");
    axios
      .patch("leave")
      .then((res) => {
        history.push("/code");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteRoom = () => {
    // console.log("Delete");
    axios
      .delete("../room")
      .then((res) => {
        console.log(res);
        history.push("/code");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const signOut = () => {
    // remove any cached content, return to main room
    // console.log("signOut");
    axios
      .post("../user/logout")
      .then((res) => {
        history.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <nav class="topnav" style={{ display: "flex" }}>
        {/* list for features */}
        <ul>
          {/* <a>
            <Link to={"/room/" + code + "/reminder"}>Reminders</Link>
          </a> */}

          <a>
            <Link to={"/room/" + code}>Room</Link>
          </a>

          <a>
            <Link to={"/room/" + code + "/roster"}>Roster</Link>
          </a>

          {/* <a>
            <Link to={"/room/" + code + "/budget"}>Message Budget</Link>
          </a> */}

          <a>
            <Link to={"/room/" + code + "/message"}>Message Board</Link>
          </a>
        </ul>

        {/* list for actions */}
        <ul style={{ marginLeft: "3rem" }}>
          <Button className="navbutton" onClick={() => setSettings(true)}>
            Settings
          </Button>

          <Button className="navbutton" onClick={leave}>
            Leave Room
          </Button>

          <Button className="navbutton" onClick={deleteRoom}>
            Delete Room
          </Button>

          <Button className="navbutton" onClick={signOut}>
            Sign Out
          </Button>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
