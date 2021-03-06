import Roster from "./Roster";
import React, { useState, useEffect } from "react";
import SelectRoster from "./SelectRoster";
import axios from "axios";

const Rosters = ({ rosters, isHost }) => {
  let [Rosters, setRosters] = useState(rosters);
  let [DisplayRoster, setDisplayRoster] = useState(null);

  useEffect(() => {
    setRosters(rosters);
    // get roster data
    if (Rosters !== null && Rosters.rosters.length !== 0) {
      setDisplayRoster({ rosters: rosters.rosters[0] });
    }
  }, [rosters]);

  useEffect(() => {
    axios
      .get("/room")
      .then((res) => {
        setRosters(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const roster = (title) => {
    for (var roster of Rosters.rosters) {
      if (roster.title === title) {
        setDisplayRoster({ rosters: roster });
        break;
      }
    }
  };

  return (
    <div style={{ width: "85vw" }}>
      <SelectRoster isHost={isHost} rosters={Rosters} setRoster={roster} />

      {Rosters !== null && DisplayRoster !== null && (
        <Roster data={DisplayRoster.rosters} isHost={isHost} />
      )}
    </div>
  );
};

export default Rosters;
