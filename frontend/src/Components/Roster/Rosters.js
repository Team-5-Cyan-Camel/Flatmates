import Roster from './Roster';
import React, {useState, useEffect} from 'react';
import SelectRoster from './SelectRoster';

const Rosters = () => {
  // set default rosters
  let [Rosters, setRosters] = useState({
    rosters: [
      {
        _id: 'dahkasjha71',
        title: 'Roster1',
        assignedUsers: ['371291731289', '131231231231'],
        tasks: [
          {
            _id: 'adjkshdkaj13',
            title: 'Cheesing',
            description: 'Grate the cheese',
            userIndex: 0,
            dueType: 'Weekly',
            due: '24/02/21',
          },
          {
            _id: 'adjkshdkaj14',
            title: 'Carroting',
            description: 'Grate the Carrot',
            userIndex: 1,
            dueType: 'Weekly',
            due: '24/02/21',
          },
        ],
      },
      {
        _id: 'dahasdasdasdkasjha71',
        title: 'Roster2',
        assignedUsers: ['371291731289', '131231231231'],
        tasks: [
          {
            _id: 'adjkshdkaj13',
            title: 'Cheasdesing',
            description: 'Grate the cheese',
            userIndex: 0,
            dueType: 'Weekly',
            due: '24/02/21',
          },
          {
            _id: 'adjkshdkaj14',
            title: 'Carroting',
            description: 'Grate the Carrot',
            userIndex: 1,
            dueType: 'Weekly',
            due: '24/02/21',
          },
        ],
      },
    ],
  });
  let [DisplayRoster, setDisplayRoster] = useState('undefined');

  useEffect(() => {
    // get roster data
    if (Rosters.rosters !== undefined && Rosters.rosters.length !== 0) {
      setDisplayRoster(Rosters.rosters[0]);
    }
  }, []);

  const roster = (title) => {
    for (var roster of Rosters.rosters) {
      if (roster.title === title) {
        setDisplayRoster(roster);
        break;
      }
    }
  };

  return (
    <>
      {Rosters.rosters !== undefined && (
        <SelectRoster rosters={Rosters.rosters} setRoster={roster} />
      )}

      <button>Add Roster+</button>
      {Rosters.rosters !== undefined && <Roster data={DisplayRoster} />}
    </>
  );
};

export default Rosters;
