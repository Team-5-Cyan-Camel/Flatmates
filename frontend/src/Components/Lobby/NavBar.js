import { Link, useHistory, useParams } from "react-router-dom";

const NavBar = ({ setSettings }) => {
  const history = useHistory();
  const { code } = useParams();
  const leave = () => {
    // ask for confirmation
    console.log("leave");
  };

  const signOut = () => {
    // remove any cached content, return to main room
    console.log("signOut");
    // history.push("/");
  };
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={"/room/" + code + "/reminder"}>Reminders</Link>
          </li>

          <li>
            <Link to={"/room/" + code + "/roster"}>Roster</Link>
          </li>

          <li>
            <Link to={"/room/" + code + "/budget"}>Message Budget</Link>
          </li>

          <li>
            <Link to={"/room/" + code + "/message"}>Message Board</Link>
          </li>
        </ul>
        <button onClick={leave}>Leave Room</button>
        <button onClick={signOut}>Sign Out</button>
        <button onClick={() => setSettings(true)}>Settings</button>
      </nav>
    </>
  );
};

export default NavBar;
