import { useState } from "react";
import { useHistory } from "react-router-dom";

import Button from 'react-bootstrap/Button';


const JoinRoom = () => {
  const history = useHistory();
  let [code, setCode] = useState(undefined);

  const joinRoom = (e) => {
    console.log("Join provided room");
    e.preventDefault();
    // check if code is set
    if (code !== undefined) {
      // need to check if room code exist
      // if does
      history.push("/room/" + code);
    }
  };
  return (
    <>
      <form onSubmit={joinRoom}>
        <h3>Join Room</h3>
        <input class = 'AccountInputField'
          type="text"
          name="code"
          placeholder="Enter Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <br />
      </form>
      <Button

className='GoButton' onClick={joinRoom}
>Join</Button>
    </>
  );
};

export default JoinRoom;
