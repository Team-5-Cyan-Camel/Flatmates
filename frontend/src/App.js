import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  useHistory,
} from "react-router-dom";
import { useState, useEffect } from "react";
import SignUp from "./Components/SignUp";

function App() {
  // obj to be populated on successful signup
  let [userObj, setObj] = useState(undefined);
  let [user, setUser] = useState(undefined);
  let [password, setPassword] = useState(undefined);

  let [code, setCode] = useState(undefined);

  // boolean for showing signup
  let [register, setSignup] = useState(false);


  const login = (e) => {
    e.preventDefault();
    console.log("check login");
    console.log(user);
    console.log(password);

    //  check if user account exist (axios)
    // if exist, set userObj. login to room
    // if no code, go to room code
    // if has code, go to room

    // then if wanted, remove pasword stored
    setPassword(undefined);
  };

  const joinRoom = (e) => {
    console.log("Join provided room");
    e.preventDefault();
    // need to check if room code exist
  };

  const history = useHistory();

  const GenerateRoom = () => {
    // sends request to generate a room
    // redirects to the room with the code
    console.log("generate room");

    // at api call, go to room
    return <Redirect to='/room/TEST'  />
    // history.push('/room/TEST');
  };

  const cancelSignup = () => {
    setSignup(false);
  };

  return (
    <Router>
      {/* path for main page */}
      <h1>Flatmates</h1>
      <Route path="/" exact>
        {/* Add username password fields here */}
        <form onSubmit={login}>
          {/* <label for="username">Username:</label> */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <br></br>
          {/* <label for="password">Password: </label> */}
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          {/* TODO need to remove direct link */}
          <Link to="/code">
            <input type="submit" value="Login" />
          </Link>
        </form>

        {/* modal */}
        {register && (
          <SignUp dismissOnClickOutside={true} cancel={cancelSignup} />
        )}
        <button onClick={() => setSignup(true)}>Sign Up Here!</button>
      </Route>

      {/* path for room code to give */}
      <Route path="/code" exact>
        <button onClick={GenerateRoom}>Generate a new room</button>
        <form onSubmit={joinRoom}>
          <h3>or join a room</h3>
          <input
            type="text"
            name="code"
            placeholder="Enter Code here"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <br />
          <input type="submit" value="Join Room!" />
        </form>
      </Route>

      {/* path for room screen */}
      <Route path="/room/:code" exact>
        <p>room</p>
      </Route>

      {/* path for incompatable path */}
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Router>
  );
}

export default App;
