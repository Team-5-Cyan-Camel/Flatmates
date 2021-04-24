import React from "react";
import { useHistory } from "react-router-dom";

const GenerateRoom = () => {
  const history = useHistory();
  const MakeRoom = () => {
    // sends request to generate a room
    // redirects to the room with the code
    console.log("generate room");

    // at api call, go to room
    // if (doesnotexist) {
    //   return <Redirect to="/room/TEST" />;
    // }
    history.push("/room/TEMP");
  };

  return (
    <>
      <button onClick={MakeRoom}>Generate a new room</button>
    </>
  );
};

export default GenerateRoom;
