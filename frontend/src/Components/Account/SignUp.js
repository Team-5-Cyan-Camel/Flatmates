import ReactDOM from "react-dom";
import styles from "./SignUp.module.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { FaTimes as Cross } from "react-icons/fa";
import axios from "axios";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const modalRoot = document.querySelector("#modal-root");

const SignUp = ({ cancel }) => {
  const history = useHistory();
  let [user, setUser] = useState("");
  let [password, setPassword] = useState("");
  let [passwordC, setPasswordC] = useState("");
  let [name, setName] = useState("");
  let [pNumber, setPNumber] = useState("");
  let [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Creating account");
    // // check if passwords are the same
    //TODO CHANGE STYLING ALERT IS AWFUL
    if (user === "") {
      alert("Please provide a username");
      return;
    }
    if (password !== "" && password !== passwordC) {
      alert("Your passwords do not match");
      return;
    }
    if (name === "") {
      alert("Please provide a name");
      return;
    }
    const newUser = {
      username: user,
      password: password,
      name: name,
      phoneNumber: pNumber,
      email: email,
    };

    axios
      .post("/user/register", newUser)
      .then((res) => {
        console.log(res);
        //call cancel to reset state
        cancel();
        history.push("/code");
      })
      .catch(function (error) {
        alert(
          "Sorry, that username has been used. Please use another username"
        );
      });
  };

  return ReactDOM.createPortal(
    <div className={styles.modalContainer}>
      <div></div>

      <div className={styles.form}>
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
            Create Account <Cross onClick={cancel} />
          </Card.Header>

          <Card.Body
            style={{
              display: "Grid",
              alignItems: "center",
              justifyContent: "center",
              width: "90%",
            }}
          >
            <form>
              <hr />
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
              <br></br>{" "}
              <input
                class="AccountInputField"
                type="password"
                id="passwordC"
                name="passwordC"
                placeholder="Confirm Password"
                value={passwordC}
                onChange={(e) => setPasswordC(e.target.value)}
              />
              <br></br>
              <input
                class="AccountInputField"
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br></br>
              <input
                class="AccountInputField"
                type="text"
                name="pNumber"
                placeholder="Phone Number"
                value={pNumber}
                onChange={(e) => setPNumber(e.target.value)}
              />
              <br></br>
              <input
                class="AccountInputField"
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br></br>
              {/* <input type="submit" value="Create Account!" /> */}
            </form>
            <Button className="GoButton" onClick={onSubmit}>
              Create
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>,
    modalRoot
  );
};

export default SignUp;
