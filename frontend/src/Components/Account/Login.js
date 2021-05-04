import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = ({ setObj }) => {
  let [user, setUser] = useState(undefined);
  let [password, setPassword] = useState(undefined);
  const history = useHistory();

  const login = (e) => {
    e.preventDefault();
    console.log("check login");
    console.log(user);
    console.log(password);

    //  check if user account exist (axios)
    // if exist, set userObj. login to room
    // setObj(userObj);

    // if no code, go to room code
    history.push("/code");

    // if has code, go to room
    // history.push("/room/"+roomCode);

    // then if wanted, remove pasword stored
    setPassword(undefined);
  };

  return (
    <>
      <Form style={{ marginLeft: "1em", marginRight: "1em" }}>
        <input
          class="AccountInputField"
          type="text"
          name="username"
          placeholder="Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <br></br>
        <input
          class="AccountInputField"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <Button className="GoButton" onClick={login}>
          Login
        </Button>
      </Form>
    </>
  );
};

export default Login;
