import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = () => {
  let [user, setUser] = useState("");
  let [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    axios
      .get("/user")
      .then((res) => {
        console.log(res.data);
        if (res.data.roomCode !== null) {
          history.push("/room/" + res.data.roomCode);
        } else {
          history.push("/code");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const login = (e) => {
    e.preventDefault();
    //  check if user account exist (axios)

    const userIn = {
      username: user,
      password: password,
    };

    axios
      .post("user/login", userIn)
      .then((res) => {
        let roomcode = res.data.roomCode;
        if (roomcode !== null) {
          history.push("/room/" + roomcode);
        } else {
          history.push("/code");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
      </Form>
      <Button className="GoButton" onClick={login}>
        Login
      </Button>
    </>
  );
};

export default Login;
