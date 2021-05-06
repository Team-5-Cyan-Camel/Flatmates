import Roster from "./Roster";
import React, { useState, useEffect } from "react";
import SelectRoster from "./SelectRoster";

const Rosters = ({ rosters }) => {
  // set default rosters
  let [Rosters, setRosters] = useState(rosters);

  //TODO need to fix this harding of first position
  //   let [DisplayRoster, setDisplayRoster] = useState(Rosters.rosters[0]);
  let [DisplayRoster, setDisplayRoster] = useState("undefined");

  useEffect(() => {
    console.log(Rosters);
    // get roster data
    if (Rosters.rosters !== "undefined" && Rosters.rosters.length !== 0) {
      setDisplayRoster(Rosters.rosters[0]);
    }
  }, []);

  const roster = (title) => {
    for (var roster of Rosters.rosters) {
      if (roster.title === title) {
        setDisplayRoster(roster);
        break;
      }
    }
  };

  return (
    <>
      {Rosters.rosters !== "undefined" && (
        <SelectRoster rosters={Rosters.rosters} setRoster={roster} />
      )}

      {Rosters.rosters !== "undefined" && DisplayRoster !== "undefined" && (
        <Roster data={DisplayRoster} />
      )}
    </>
  );
};

export default Rosters;
