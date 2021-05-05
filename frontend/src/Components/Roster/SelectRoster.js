import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import '../Lobby/NavBar.css';

const SelectRoster = ({rosters, setRoster}) => {
  return (
    <>
      {rosters !== 'undefined' && (
        <Card
          id='Card-field'
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Card.Body
            style={{
              display: 'Flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90%',
            }}
          >
            {/* <div class='topnav' style={{display: 'flex'}}> */}
            {rosters !== undefined &&
              rosters.map((e) => [
                <Button className='GoButton' onClick={() => setRoster(e.title)}>
                  {e.title}
                </Button>,
              ])}
            <Button className='GoButton'>Add+</Button>
            {/* </div> */}
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default SelectRoster;
