import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import { useState, useEffect } from "react";
import SignUp from "./Components/SignUp";

function App() {
  // obj to be populated on successful signup
  let [userObj, setObj] = useState(undefined);
  let [user, setUser] = useState(undefined);
  let [password, setPassword] = useState(undefined);

  // boolean for showing signup
  let [register, setSignup] = useState(false);

  const onSubmit = (e) => {
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

  const cancelSignup = () => {
    setSignup(false);
  };

  return (
    <Router>
      {/* path for main page */}
      <Route path="/" exact>
        <h1>Flatmates</h1>
        {/* Add username password fields here */}
        <form onSubmit={onSubmit}>
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
          <input type="submit" value="Login" />
        </form>

        {/* modal */}
        {register && (
          <SignUp dismissOnClickOutside={true} cancel={cancelSignup} />
        )}
        <button onClick={() => setSignup(true)}>Sign Up Here!</button>
      </Route>

      {/* path for sign up screen */}
      <Route path="/signup">
        <h2>Sign Up</h2>

        {/* username field */}
        {/* password field */}
        {/* password confirmation */}
      </Route>

      {/* path for room code to give */}
      <Route path="/code">
        <p>code</p>
      </Route>

      {/* path for room screen */}
      <Route path="/room">
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
