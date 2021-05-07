import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import SignUp from "./Components/Account/SignUp";
import Settings from "./Components/Account/Settings";
import Login from "./Components/Account/Login";
import GenerateRoom from "./Components/Code/GenerateRoom";
import JoinRoom from "./Components/Code/JoinRoom";
import NavBar from "./Components/Lobby/NavBar";
import Room from "./Components/Room/Room";
import axios from "axios";

import "./Components/Lobby/NavBar.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Rosters from "./Components/Roster/Rosters";

function App() {
  // boolean for showing signup
  let [register, setSignup] = useState(false);
  let [settings, setSettings] = useState(false);
  const [update, setUpdate] = useState(false);
  let [room, setRoom] = useState(null);
  const [isHost, setIsHost] = useState(false);
  let [hostId, setHostId] = useState(null);

  useEffect(() => {
    axios
      .get("/room")
      .then((res) => {
        setRoom(res.data);
        // console.log(res.data.host);
        setHostId(res.data.host);
        // console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [update]);

  const cancelSignup = () => {
    setSignup(false);
  };

  const hideSettings = () => {
    setSettings(false);
  };

  const setHost = (res) => {
    setIsHost(res);
  };

  const updateDb = () => {
    console.log("update");
    setUpdate(!update);
  };

  return (
    <div className="BackGroundImage">
      <Container>
        
          {/* path for main page */}

          <Router>
            <Route path="/" exact>
            <div className="MakeCentre">
              <h1 className="StartTitle">
                Flatmates
                <small style={{ fontSize: "1.5rem" }}>1.0</small>
              </h1>

              <Card
                id="Card-field"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Card.Header
                  as="h5"
                  id="Card-Header"
                  className="text-center"
                  style={{ width: "100%" }}
                >
                  {" "}
                  Sign in
                </Card.Header>

                <Card.Body
                  style={{
                    display: "Grid",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "90%",
                  }}
                >
                  <Login />
                  {/* modal for login*/}
                  {register && (
                    <SignUp
                      style={{ width: "100px" }}
                      dismissOnClickOutside={true}
                      cancel={cancelSignup}
                    />
                  )}

                  <div style={{ marginTop: "1rem" }}>
                    <p style={{ textAlign: "center" }}>
                      {" "}
                      Dont have an account?
                      <a
                        style={{ marginLeft: "10px", color: "white" }}
                        href="#"
                        onClick={() => setSignup(true)}
                        rel="noreferrer"
                      >
                        Sign Up{" "}
                      </a>
                    </p>
                  </div>
                </Card.Body>
              </Card>
              </div>
            </Route>

            {/* path for room code to give */}
            <Route path="/code" exact>
            <div className="MakeCentre">
              <Card
                id="Card-field"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Card.Header
                  as="h5"
                  id="Card-Header"
                  className="text-center"
                  style={{ width: "100%" }}
                >
                  {" "}
                  Sign in
                </Card.Header>

                <Card.Body
                  style={{
                    display: "Grid",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "90%",
                  }}
                >
                  <GenerateRoom />
                  <JoinRoom />
                </Card.Body>
              </Card>
              </div>
            </Route>

            {/* path for room screen */}
            <Route path="/room/:code">
            
              <NavBar
                setSettings={setSettings}
                isHost={isHost}
                setUpdate={setUpdate}
              />
              {settings && <Settings hideSettings={hideSettings} />}
            </Route>

            <Route path="/room/:code" exact>
              <Room
                update={update}
                room={room}
                hostId={hostId}
                setIsHost={setIsHost}
              />
            </Route>

            <Route path="/room/:code/roster" exact>
            <div className="MakeCentreRoster">
              helloasdasdasd
              <Rosters rosters={room} isHost={isHost} updateDb={updateDb} /></div>
            </Route>

            {/* path for incompatable path */}
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Router>
        
      </Container>
    </div>
  );
}

export default App;
