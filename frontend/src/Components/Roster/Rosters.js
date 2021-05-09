import Roster from "./Roster";
import React, { useState, useEffect } from "react";
import SelectRoster from "./SelectRoster";
import axios from "axios";

const Rosters = ({ room, isHost }) => {
  let [Room, setRoom] = useState(room);
  let [DisplayRoster, setDisplayRoster] = useState(null);

  useEffect(() => {
    setRoom(room);
    // get roster data
    if (Room !== null && Room.rosters.length !== 0) {
      setDisplayRoster({ rosters: Room.rosters[0] });
    }
  }, [room]);

  useEffect(() => {
    axios
      .get("/room")
      .then((res) => {
        setRoom(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const roster = (title) => {
    for (var roster of Room.rosters) {
      if (roster.title === title) {
        setDisplayRoster({ rosters: roster });
        break;
      }
    }
  };

  return (
    <div style={{ width: "85vw" }}>
      <SelectRoster isHost={isHost} room={Room} setRoster={roster} />

      {Room !== null && DisplayRoster !== null && (
        <Roster data={DisplayRoster.rosters} isHost={isHost} />
      )}
    </div>
  );
};

export default Rosters;
