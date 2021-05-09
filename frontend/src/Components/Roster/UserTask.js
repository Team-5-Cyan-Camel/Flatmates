import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';
import AddTask from './AddTask';
import {FaTimes as Cross} from 'react-icons/fa';
import axios from 'axios';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Button from 'react-bootstrap/Button';

const UserTask = ({task, name, rid, pid}) => {
  let [makeTask, setMakeTask] = useState(false);
  const deleteTask = (id) => {
    confirmAlert({
      title: 'Deleting Task',
      message: 'Are you sure you want to delete this task',
      buttons: [
        {
          label: 'Ok',
          onClick: () => {
            const delTask = {
              rosterID: rid,
              taskID: id,
            };

            axios
              .delete('/roster/task', {data: delTask})
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
      <Card
        id='Card-field'
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '20rem',
          maxHeight: '100%',
        }}
      >
        <Card.Header
          as='h5'
          id='Card-Header'
          className='text-center'
          style={{width: '100%'}}
        >
          {' '}
          {name}
        </Card.Header>

        <Card.Body
          style={{
            display: 'Grid',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: '0!important',
          }}
        >
          <div style={{overflow: 'hidden', maxHeight: '100%'}}>
            {task.map((e) => {
              return (
                <Card
                  id='Card-field'
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Card.Body
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '60%',
                      outlineColor: 'black',
                    }}
                  >
                    <p>
                      <Cross onClick={() => deleteTask(e._id)} />
                      {e.title} {': '}{' '}
                      {e.description === '' ? 'N/A' : e.description}
                    </p>
                  </Card.Body>
                </Card>
              );
            })}

            <Button className='GoButton' onClick={() => setMakeTask(true)}>
              Add Task
            </Button>
          </div>
        </Card.Body>
      </Card>

      {makeTask && <AddTask show={setMakeTask} rid={rid} pid={pid} />}
    </>
  );
};

export default UserTask;
