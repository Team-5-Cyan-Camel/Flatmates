import Roster from "./Roster";
import React, { useState, useEffect } from "react";
import SelectRoster from "./SelectRoster";

const Rosters = ({ rosters, updateDb }) => {
  // set default rosters
  let [Rosters, setRosters] = useState(rosters);

  //TODO need to fix this harding of first position
  //   let [DisplayRoster, setDisplayRoster] = useState(Rosters.rosters[0]);
  let [DisplayRoster, setDisplayRoster] = useState(null);

  useEffect(() => {
    console.log(Rosters);
    // get roster data
    if (Rosters !== null && Rosters.rosters.length !== 0) {
      setDisplayRoster({ rosters: rosters.rosters[0] });
    }
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
    <>
      <SelectRoster rosters={Rosters} setRoster={roster} updateDb={updateDb} />

      {Rosters !== null && DisplayRoster !== null && (
        <Roster data={DisplayRoster.rosters} />
      )}
    </>
  );
};

export default Rosters;
