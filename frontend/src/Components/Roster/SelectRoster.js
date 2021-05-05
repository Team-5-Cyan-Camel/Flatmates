import React from 'react';
import Card from 'react-bootstrap/Card';

const SelectRoster = ({rosters, setRoster}) => {
  return (
    <>
      <Card
        id='Card-field'
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {rosters.map((e) => [
          <button onClick={() => setRoster(e.title)}>{e.title}</button>,
        ])}
        <button>+</button>
      </Card>
    </>
  );
};

export default SelectRoster;
