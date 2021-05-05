import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const UserTask = ({name, task}) => {
  console.log(task);
  return (
    <>
      <Card
        id='Card-field'
        style={{
          alignItems: 'center',
          justifyContent: 'center',
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
            width: '90%',
          }}
        >
          {task.map((e) => {
            return <p>{e.title}</p>;
          })}

          <Button className='GoButton'>Add Task</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default UserTask;

// {
//     _id: 'adjkshdkaj13',
//     title: 'Cheesing',
//     description: 'Grate the cheese',
//     userIndex: 0,
//     dueType: 'Weekly',
//     due: '24/02/21',
//   }
