import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import '../Lobby/NavBar.css';
import AddRoster from './AddRoster';
import {useState, useEffect} from 'react';
import {FaTimes as Cross} from 'react-icons/fa';
import axios from 'axios';
import '../Lobby/NavBar.css';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link, NavLink, useHistory, useParams} from 'react-router-dom';
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const SelectRoster = ({rosters, setRoster, updateDb, isHost}) => {
  let [makeRoster, setMakeRoster] = useState(false);

  const deleteRoster = (id) => {
    confirmAlert({
      title: 'Deleting Roster',
      message: 'Are you sure you want to delete this roster?',
      buttons: [
        {
          label: 'Ok',
          onClick: () => {
            const rostDel = {
              rosterID: id,
            };

            axios
              .delete('/roster', {data: rostDel})
              .then((res) => {})
              .catch(function (error) {
                console.log(error);
              });
          },
        },
        {
          label: 'Cancel',
        },
      ],
    });
  };

  return (
    <>
      <Navbar bg='dark' variant='dark' style={{}}>
        <Nav className='mr-auto'>
          {rosters !== null &&
            rosters.rosters.map((e, i) => [
              <Nav.Link
                key={i}
                onClick={() => setRoster(e.title)}
                style={{outline: '1px solid black ', outlineColor: 'black'}}
              >
                {e.title}{' '}
                {isHost && <Cross onClick={() => deleteRoster(e._id)} />}
              </Nav.Link>,
            ])}
        </Nav>
        <Button className='NavBarButton' onClick={() => setMakeRoster(true)}>
          add
        </Button>
      </Navbar>
      {makeRoster && <AddRoster show={setMakeRoster} updateDb={updateDb} />}
    </>
  );
};

export default SelectRoster;
