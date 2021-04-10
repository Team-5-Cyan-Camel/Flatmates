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
        <p>Main</p>
        <Link to="/signup">Signup</Link>
      </Route>

      {/* path for sign up screen */}
      <Route path="/signup">
        <p>signup</p>
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
