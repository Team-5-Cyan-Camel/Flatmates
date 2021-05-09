import ReactDOM from "react-dom";
import styles from "./SignUp.module.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { FaTimes as Cross } from "react-icons/fa";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import Alert from "@material-ui/lab/Alert";
// import AlertTitle from "@material-ui/lab/AlertTitle";

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
    // // check if passwords are the same
    //TODO CHANGE STYLING ALERT IS AWFUL
    if (user === "") {
      confirmAlert({
        title: "Username missing",
        message: "Please provide a username",
        buttons: [
          {
            label: "ok",
          },
        ],
      });
      return;
    }
    if (password !== "" && password !== passwordC) {
      confirmAlert({
        title: "Password error",
        message: "Please provide matching passwords",
        buttons: [
          {
            label: "ok",
          },
        ],
      });
      return;
    }
    if (name === "") {
      confirmAlert({
        title: "Name missing",
        message: "Please provide a name",
        buttons: [
          {
            label: "ok",
          },
        ],
      });
      return;
    }
    if (pNumber === "") {
      confirmAlert({
        title: "Phone missing",
        message: "Please provide a phone number",
        buttons: [
          {
            label: "ok",
          },
        ],
      });
      return;
    }
    if (email === "") {
      confirmAlert({
        title: "Email missing",
        message: "Please provide a email",
        buttons: [
          {
            label: "ok",
          },
        ],
      });
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
        //call cancel to reset state
        cancel();
        history.push("/code");
      })
      .catch(function (error) {
        confirmAlert({
          title: "Username used",
          message:
            "Sorry, that username has been used. Please use another username",
          buttons: [
            {
              label: "ok",
            },
          ],
        });
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
                className="AccountInputField"
                type="text"
                name="username"
                placeholder="Username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
              <br></br>
              <input
                className="AccountInputField"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br></br>{" "}
              <input
                className="AccountInputField"
                type="password"
                id="passwordC"
                name="passwordC"
                placeholder="Confirm Password"
                value={passwordC}
                onChange={(e) => setPasswordC(e.target.value)}
              />
              <br></br>
              <input
                className="AccountInputField"
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br></br>
              <input
                className="AccountInputField"
                type="text"
                name="pNumber"
                placeholder="Phone Number"
                value={pNumber}
                onChange={(e) => setPNumber(e.target.value)}
              />
              <br></br>
              <input
                className="AccountInputField"
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
