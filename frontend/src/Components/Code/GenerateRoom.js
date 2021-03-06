import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";

const GenerateRoom = () => {
  const history = useHistory();
  const MakeRoom = () => {
    axios
      .post("/room")
      .then((res) => {
        history.push("/room/" + res.data.roomCode);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Button onClick={MakeRoom} className="GoButton">
        Generate
      </Button>
    </>
  );
};

export default GenerateRoom;
