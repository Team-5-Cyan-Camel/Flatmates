import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../src/App.css';
import '../../App.css';

const Roster = ({data}) => {
  useEffect(() => {
    console.log(data.assignedUsers);
  }, []);

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
          {data.title}
        </Card.Header>

        <Card.Body
          style={{
            display: 'Grid',
            alignItems: 'center',
            justifyContent: 'center',
            width: '90%',
          }}
        ></Card.Body>
      </Card>
    </>
  );
};

export default Roster;
