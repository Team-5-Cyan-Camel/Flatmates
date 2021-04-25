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
        {/* list for features */}
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

        {/* list for actions */}
        <ul>
          <li>
            <button onClick={() => setSettings(true)}>Settings</button>
          </li>
          <li>
            <button onClick={leave}>Leave Room</button>
          </li>
          <li>
            <button onClick={signOut}>Sign Out</button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
