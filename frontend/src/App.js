import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  // let [userObj, ]

  return (
    <Router>
      {/* path for main page */}
      <Route path="/" exact>
        <p>Flatmates</p>

        {/* Add username password fields here */}
        <form>
          {/* <label for="username">Username:</label> */}
          <input type="text" name="username" placeholder="Username" />
          <br></br>
          {/* <label for="password">Password: </label> */}
          <input
            type="password"
            id="lname"
            name="lname"
            placeholder="Password"
          />
          <br></br>
          <input type="submit" value="Login" />
        </form>

        <p>
          Or if you don't have an account,{" "}
          <Link to="/signup">
            <b>sign up</b>
          </Link>{" "}
          here
        </p>
      </Route>

      {/* path for sign up screen */}
      <Route path="/signup">
        <p>signup</p>

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
