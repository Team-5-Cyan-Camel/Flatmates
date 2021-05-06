import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Room = ({ update, setRoom }) => {
  useEffect(() => {
    axios
      .get("./")
      .then((res) => {
        console.log(res.data);
        setRoom(res.data);
        console.log(res.data.rosters);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [update]);

  return <div></div>;
};

export default Room;
