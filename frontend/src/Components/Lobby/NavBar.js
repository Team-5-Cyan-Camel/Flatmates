import { Link, useParams } from "react-router-dom";

const NavBar = () => {
  const { code } = useParams();
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
      </nav>
    </>
  );
};

export default NavBar;
