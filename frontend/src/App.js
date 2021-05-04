import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import SignUp from "./Components/Account/SignUp";
import Settings from "./Components/Account/Settings";
import Login from "./Components/Account/Login";
import GenerateRoom from "./Components/Code/GenerateRoom";
import JoinRoom from "./Components/Code/JoinRoom";
import NavBar from "./Components/Lobby/NavBar";

import './Components/Lobby/NavBar.css'



import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';


function App() {
  // obj to be populated on successful signup
  let [userObj, setObj] = useState(undefined);

  // boolean for showing signup
  let [register, setSignup] = useState(false);
  let [settings, setSettings] = useState(false);

  const cancelSignup = () => {
    setSignup(false);
  };

  const hideSettings = () => {
    setSettings(false);
  };

  return (
    <div className='BackGroundImage'>
      <Container>
        <div className='MakeCentre'>

          {/* path for main page */}

          <Router>
            <Route path="/" exact>

              <h1 className='StartTitle'>
                Flatmates
                  <small style={{ fontSize: '1.5rem', }}>
                  1.0
                  </small>
              </h1>

              <Card id='Card-field' style={{
                  alignItems: 'center',
                  justifyContent: 'center', }}>

                <Card.Header
                  as='h5'
                  id='Card-Header'
                  className='text-center'
                  style={{ width: '100%' }} >
                  {' '}
                  Sign in
                </Card.Header>

                <Card.Body style={{
                    display: 'Grid',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '90%' }} >
                  <Login setObj={setObj} />
                  {/* modal for login*/}
                  {register && (
                    <SignUp
                      style={{ width: '100px'}}
                      dismissOnClickOutside={true}
                      cancel={cancelSignup}
                      setObj={setObj}/>)}

                  <Button className='GoButton' >Login</Button>

                  <div style={{ marginTop: '1rem' }}>
                    <p style={{ textAlign: 'center', }} > Dont have an account?
                         <a style={{ marginLeft: '10px', color: 'white' }} href="#"
                        onClick={() => setSignup(true)}
                        rel="noreferrer">
                        Sign Up </a> 
                    </p>
                  </div>

                </Card.Body>
              </Card>

            </Route>



            {/* path for room code to give */}
            <Route path="/code" exact>

              <Card id='Card-field'
                style={{
                  alignItems: 'center',
                  justifyContent: 'center', }}>

                <Card.Header
                  as='h5'
                  id='Card-Header'
                  className='text-center'
                  style={{ width: '100%' }}>
                  {' '}
                  Sign in
                </Card.Header>

                <Card.Body style={{
                    display: 'Grid',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '90%'  }} >
                  <GenerateRoom />
                  <JoinRoom />

                </Card.Body>
              </Card>


            </Route>

            {/* path for room screen */}
            <Route path="/room/:code">

              <NavBar setSettings={setSettings} />
              {/* modal for user settings*/}
              {settings && <Settings hideSettings={hideSettings} />}

              <Card id='Card-field' style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>

                <Card.Header
                  as='h5'
                  id='Card-Header'
                  className='text-center'
                  style={{ width: '100%' }}>
                  {' '}
                  main page
                </Card.Header>

                <Card.Body style={{
                    display: 'Grid',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '90%' }}>
                </Card.Body>
              </Card>


            </Route>
            {/* path for incompatable path */}
            <Route path="*">
              <Redirect to="/" />
            </Route>

          </Router>

        </div>

      </Container>
    </div>
  );
}

export default App;
