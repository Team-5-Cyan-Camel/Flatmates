import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

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
      <form onSubmit={login}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <br></br>
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
    </>
  );
};

export default Login;
