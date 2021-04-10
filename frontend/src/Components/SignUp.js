import ReactDOM from "react-dom";
import styles from "./SignUp.module.css";

const modalRoot = document.querySelector("#modal-root");

const SignUp = ({ dismissOnClickOutside, cancel }) => {
  return ReactDOM.createPortal(
    <div
      className={styles.modalContainer}
      onClick={(e) => {
        if (dismissOnClickOutside && e.target.parentElement === modalRoot) {
          cancel();
        }
      }}
    >
      <p>MODAL</p>
    </div>,
    modalRoot
  );
};

export default SignUp;
