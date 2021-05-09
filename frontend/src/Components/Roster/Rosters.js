import Roster from "./Roster";
import React, { useState, useEffect } from "react";
import SelectRoster from "./SelectRoster";

const Rosters = ({ rosters, updateDb, isHost }) => {
  let [Rosters, setRosters] = useState(rosters);
  let [DisplayRoster, setDisplayRoster] = useState(null);

  useEffect(() => {
    setRosters(rosters);
    // get roster data
    if (Rosters !== null && Rosters.rosters.length !== 0) {
      setDisplayRoster({ rosters: rosters.rosters[0] });
    }
  }, [rosters]);

  const roster = (title) => {
    for (var roster of Rosters.rosters) {
      if (roster.title === title) {
        setDisplayRoster({ rosters: roster });
        break;
      }
    }
  };

  return (
    <div>
      <SelectRoster
        isHost={isHost}
        rosters={Rosters}
        setRoster={roster}
        updateDb={updateDb}
      />

      {Rosters !== null && DisplayRoster !== null && (
        <Roster
          data={DisplayRoster.rosters}
          isHost={isHost}
          updateDb={updateDb}
        />
      )}
    </div>
  );
};

export default Rosters;
