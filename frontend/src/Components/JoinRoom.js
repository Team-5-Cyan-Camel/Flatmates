import { useState } from "react";
import { useHistory } from "react-router-dom";

const JoinRoom = () => {
  const history = useHistory();
  let [code, setCode] = useState(undefined);

  const joinRoom = (e) => {
    console.log("Join provided room");
    e.preventDefault();
    // need to check if room code exist
    // if does
    history.push("/room/" + code);
  };
  return (
    <>
      <form onSubmit={joinRoom}>
        <h3>or join a room</h3>
        <input
          type="text"
          name="code"
          placeholder="Enter Code here"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <br />
        <input type="submit" value="Join Room!" />
      </form>
    </>
  );
};

export default JoinRoom;
