import "./App.css";
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* path for main page */}
      <Route path="/" exact>
        <p>Main</p>
        <Link to="/signup">
          signup
        </Link>
      </Route>

      {/* path for sign up screen */}
      <Route path="/signup">
        <p>signup</p>
      </Route>

      {/* path for code screen */}
        <Route path="/code">
      <p>code</p>
      </Route>


      {/* path for room screen */}
      <Route path="/room">
      <p>room</p>
      </Route>

      {/* path for incompatable path */}
      <Route path="*">
        <Redirect to ="/"/>
      </Route>
    </Router>
  );
}

export default App;
