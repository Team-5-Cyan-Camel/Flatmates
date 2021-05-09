<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import UserTask from "./UserTask";
import "../../App.css";
import axios from "axios";
import { ArrowRight } from "react-bootstrap-icons";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { FaSyncAlt } from "react-icons/fa";
=======
import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import UserTask from './UserTask';
import '../../App.css';
import axios from 'axios';
>>>>>>> e83f15e9b39d2dc79dad01e9a16a20aab16100f3

const Roster = ({data, updateDb, isHost}) => {
  let [ifHost, setIsHost] = useState(isHost);

  const rotate = () => {
    const rotateRep = {
      rosterID: data._id,
    };

    axios
      .patch('/roster/rotate', rotateRep)
      .then((res) => {})
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      {data !== 'undefined' && (
        <Card
          id='Card-field'
          style={{
<<<<<<< HEAD
            alignItems: "center",
            justifyContent: "center",
            height: "65vh",
            maxHeight: "80vh",
            minWidth: "0",
            borderTopRightRadius: "0",
            borderTopLeftRadius: "0",
            width: "100%",
          }}
        >
          <Card.Header
            as="h5"
            id="Card-Header"
            className="text-center"
            style={{
              width: "100%",
              borderTopRightRadius: "0",
              borderTopLeftRadius: "0",
              alignItems: "center",
              justifyContent: "center",
              display: "grid",
              gridTemplateColumns: "1fr 7fr 1fr",
            }}
          >
            <div></div>
            {data.title}
            {ifHost && (
              <Button className="NavBarButton" onClick={rotate}>
                <FaSyncAlt />
=======
            alignItems: 'center',
            justifyContent: 'center',
            height: '60vh',
            maxHeight: '70vh',
            borderTopRightRadius: '0',
            borderTopLeftRadius: '0',
          }}
        >
          <Card.Header
            as='h5'
            id='Card-Header'
            className='text-center'
            style={{
              width: '100%',
              borderTopRightRadius: '0',
              borderTopLeftRadius: '0',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'grid',
              gridTemplateColumns: '1fr 7fr 1fr',
            }}
          >
            <div></div> asdasd
            {data.title}
            {ifHost && (
              <Button
                className='GoButton'
                style={{margin: '0'}}
                onClick={rotate}
              >
                rotate
>>>>>>> e83f15e9b39d2dc79dad01e9a16a20aab16100f3
              </Button>
            )}
          </Card.Header>

          <Card.Body
            className="UsersTasksList"
            style={{
<<<<<<< HEAD
              display: "grid",
              gridAutoFlow: "column",
              alignItems: "center",

              overflowX: "auto",
              minWidth: "0",
              width: "100%",
              padding: "1em",
=======
              display: 'Flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              width: '90%',
              maxHeight: '100%',
>>>>>>> e83f15e9b39d2dc79dad01e9a16a20aab16100f3
            }}
          >
            {data.assignedUsers.map((e, i) => {
              return (
                <UserTask
                  key={i}
                  rid={data._id}
                  pid={e._id}
                  name={e.name}
                  updateDb={updateDb}
                  task={data.tasks.filter((data) => {
                    return data.userIndex === i;
                  })}
                />
              );
            })}
<<<<<<< HEAD

            <div style={{ margin: "0.25em" }}> </div>
=======
>>>>>>> e83f15e9b39d2dc79dad01e9a16a20aab16100f3
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Roster;
