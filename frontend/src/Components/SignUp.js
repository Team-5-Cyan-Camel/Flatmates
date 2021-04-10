import ReactDOM from "react-dom";
import styles from "./SignUp.module.css";
import { useState } from "react";
import { FaTimes as Cross } from "react-icons/fa";

const modalRoot = document.querySelector("#modal-root");

const SignUp = ({ cancel }) => {
  let [user, setUser] = useState(undefined);
  let [password, setPassword] = useState(undefined);
  let [passwordC, setPasswordC] = useState(undefined);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Creating account");
    // // check if passwords are the same
    if (password === passwordC) {
      //   check if username is legit
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.modalContainer}>
      <div></div>

      <div className={styles.form}>
        <form onSubmit={onSubmit}>
          <h3>
            Create Account! <Cross onClick={cancel} />
          </h3>
          <hr />
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
          <br></br>{" "}
          <input
            type="password"
            id="passwordC"
            name="passwordC"
            placeholder="Confirm Password"
            value={passwordC}
            onChange={(e) => setPasswordC(e.target.value)}
          />
          <br></br>
          <input type="submit" value="Create Account!" />
        </form>
      </div>
    </div>,
    modalRoot
  );
};

export default SignUp;
