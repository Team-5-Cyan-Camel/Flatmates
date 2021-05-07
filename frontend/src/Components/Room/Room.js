import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Room = ({ update, setHost }) => {
  useEffect(() => {
    axios
      .get("/user")
      .then((res) => {
        setHost(res.data.isHost);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return <div></div>;
};

export default Room;
