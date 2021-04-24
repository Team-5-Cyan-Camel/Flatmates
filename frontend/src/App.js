import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import { useState, useEffect } from "react";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import GenerateRoom from "./Components/GenerateRoom";
import JoinRoom from "./Components/JoinRoom";

function App() {
  // obj to be populated on successful signup
  let [userObj, setObj] = useState(undefined);

  // boolean for showing signup
  let [register, setSignup] = useState(false);

  const cancelSignup = () => {
    setSignup(false);
  };

  return (
    <Router>
      {/* path for main page */}
      <h1>Flatmates</h1>
      <Route path="/" exact>
        <Login />
        {/* modal */}
        {register && (
          <SignUp dismissOnClickOutside={true} cancel={cancelSignup} />
        )}
        <button onClick={() => setSignup(true)}>Sign Up Here!</button>
      </Route>

      {/* path for room code to give */}
      <Route path="/code" exact>
        <GenerateRoom />
        <JoinRoom />
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
