import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import Button from 'react-bootstrap/Button';

const JoinRoom = () => {
  const history = useHistory();
  let [code, setCode] = useState('');

  const joinRoom = (e) => {
    e.preventDefault();
    // check if code is set
    let roomCode = {
      roomCode: code,
    };
    if (code !== '') {
      axios
        .post('/room/join', roomCode)
        .then((res) => {
          history.push('/room/' + code);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <>
      <form onSubmit={joinRoom}>
        <h3>Join Room</h3>
        <input
          className='AccountInputField'
          type='text'
          name='code'
          placeholder='Enter Code'
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <br />
      </form>
      <Button className='GoButton' onClick={joinRoom}>
        Join
      </Button>
    </>
  );
};

export default JoinRoom;
