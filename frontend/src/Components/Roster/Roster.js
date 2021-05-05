import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserTask from './UserTask';
import '../../App.css';

// {
//     _id: 'dahkasjha71',
//     title: 'Roster1',
//     assignedUsers: ['371291731289', '131231231231'],
//     tasks: [
//       {
//         _id: 'adjkshdkaj13',
//         title: 'Cheesing',
//         description: 'Grate the cheese',
//         userIndex: 0,
//         dueType: 'Weekly',
//         due: '24/02/21',
//       },
//       {
//         _id: 'adjkshdkaj14',
//         title: 'Carroting',
//         description: 'Grate the Carrot',
//         userIndex: 1,
//         dueType: 'Weekly',
//         due: '24/02/21',
//       },
//     ],
//   },

const Roster = ({data}) => {
  useEffect(() => {}, []);

  return (
    <>
      {data !== 'undefined' && (
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
            {data.title}
          </Card.Header>

          <Card.Body
            style={{
              display: 'Grid',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90%',
            }}
          >
            {data.assignedUsers.map((e, i) => {
              return (
                <UserTask
                  name={e}
                  task={data.tasks.filter((data) => {
                    return data.userIndex === i;
                  })}
                />
              );
            })}
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Roster;

// data.tasks.filter((data) => {
//     return data.userIndex === 0;
//   });
