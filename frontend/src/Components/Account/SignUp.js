import ReactDOM from "react-dom";
import styles from "./SignUp.module.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { FaTimes as Cross } from "react-icons/fa";

import "../../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const modalRoot = document.querySelector("#modal-root");

const SignUp = ({ cancel, setObj }) => {
  const history = useHistory();
  let [user, setUser] = useState("");
  let [password, setPassword] = useState("");
  let [passwordC, setPasswordC] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Creating account");
    // // check if passwords are the same
    if (user !== "" && password !== "" && password === passwordC) {
      //   check if username is unique
      // if unique

      //set userObj made from db
      // setObj(userObj);

      //call cancel to reset state
      cancel();

      //change location
      history.push("/code");
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.modalContainer}>
      <div></div>

      <div className={styles.form}>



      <Card id='Card-field'
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',

                          }}>


          <Card.Header
                  as='h5'
                  id='Card-Header'
                  className='text-center'
                  style={{ width: '100%' }}
                >
                  {' '}
                  Create Account <Cross onClick={cancel} />
                </Card.Header>



          <Card.Body
          
                  style={{
                    display: 'Grid',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '90%'

                  }}
          
          >




        <form onSubmit={onSubmit}>

          <hr />
          <input class = 'AccountInputField'
            type="text"
            name="username"
            placeholder="Username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <br></br>
          <input class = 'AccountInputField'
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>{" "}
          <input class = 'AccountInputField'
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
          <Button

className='GoButton'
>Create</Button>



        </Card.Body>              
    </Card>




      </div>
    </div>,
    modalRoot
  );
};

export default SignUp;
