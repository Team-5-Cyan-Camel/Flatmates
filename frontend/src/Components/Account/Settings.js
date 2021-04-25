import ReactDOM from "react-dom";
import { FaTimes as Cross } from "react-icons/fa";
import styles from "./Settings.module.css";

const modalRoot = document.querySelector("#modal-root");

const Settings = ({ hideSettings }) => {
  return ReactDOM.createPortal(
    <div className={styles.modalContainer}>
      {/* add code */}
      <Cross onClick={hideSettings} />
      <p>TESTTT</p>
    </div>,
    modalRoot
  );
};

export default Settings;
