import ReactDOM from 'react-dom';
import {FaTimes as Cross} from 'react-icons/fa';
import styles from './Settings.module.css';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const modalRoot = document.querySelector('#modal-root');

const Settings = ({hideSettings}) => {
  let [name, setName] = useState('');
  let [pNumber, setPNumber] = useState('');
  let [email, setEmail] = useState('');

  useEffect(() => {
    axios
      .get('/user')
      .then((res) => {
        setName(res.data.name);
        setPNumber(res.data.phoneNumber);
        setEmail(res.data.email);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const update = () => {
    const updateUser = {
      name: name,
      phoneNumber: pNumber,
      email: email,
    };
    axios
      .patch('/user/update', updateUser)
      .then((res) => {
        hideSettings();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return ReactDOM.createPortal(
    <div className={styles.modalContainer}>
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
          Settings
          <Cross onClick={hideSettings} />
        </Card.Header>

        <Card.Body
          style={{
            display: 'Grid',
            alignItems: 'center',
            justifyContent: 'center',
            width: '90%',
          }}
        >
          <form>
            Name
            <input
              className='AccountInputField'
              type='text'
              name='name'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br></br>
            Phone Number
            <input
              className='AccountInputField'
              type='text'
              name='pNumber'
              placeholder='Phone Number'
              value={pNumber}
              onChange={(e) => setPNumber(e.target.value)}
            />
            <br></br>
            Email
            <input
              className='AccountInputField'
              type='text'
              name='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br></br>
          </form>
          <Button className='GoButton' onClick={update}>
            Update
          </Button>
        </Card.Body>
      </Card>
    </div>,
    modalRoot
  );
};

export default Settings;
