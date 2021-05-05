import ReactDOM from "react-dom";
import { FaTimes as Cross } from "react-icons/fa";
import styles from "./Settings.module.css";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

const modalRoot = document.querySelector("#modal-root");

const Settings = ({ hideSettings }) => {
  return ReactDOM.createPortal(
    <div className={styles.modalContainer}>
      {/* add code */}
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
          Settings
          <Cross onClick={hideSettings} />
        </Card.Header>

        <Card.Body
          style={{
            display: "Grid",
            alignItems: "center",
            justifyContent: "center",
            width: "90%",
          }}
        ></Card.Body>
      </Card>
    </div>,
    modalRoot
  );
};

export default Settings;
