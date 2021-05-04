import { Link, useHistory, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';


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

      <nav class="topnav" style={{ display:'flex' }}>
        {/* list for features */}
        <ul>
          <a>
            <Link to={"/room/" + code + "/reminder"}>Reminders</Link>
          </a>

          <a>
            <Link to={"/room/" + code + "/roster"}>Roster</Link>
          </a>

          <a>
            <Link to={"/room/" + code + "/budget"}>Message Budget</Link>
          </a>

          <a>
            <Link to={"/room/" + code + "/message"}>Message Board</Link>
          </a>
        </ul>

        {/* list for actions */}
        <ul style={{ marginLeft:'3rem' }}>

            <Button className='navbutton' onClick={() => setSettings(true)}>Settings</Button>

            <Button className='navbutton' onClick={leave}>Leave Room</Button>

            <Button className='navbutton' onClick={signOut}>Sign Out</Button>

        </ul>
      </nav>
    </>
  );
};

export default NavBar;
