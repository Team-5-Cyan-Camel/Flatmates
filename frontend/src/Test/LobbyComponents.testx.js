import React from "react";
import renderer from "react-test-renderer";
import NavBar from "../Components/Lobby/NavBar";

// TypeError: Cannot read property 'match' of undefined

// 10 | const NavBar = ({ setSettings, setUpdate, isHost }) => {
// 11 |   const history = useHistory();
// > 12 |   const { code } = useParams();
//    |                    ^
// 13 |   const socket = useContext(SocketContext);
// 14 |
// 15 |   useEffect(() => {

// test("Navbar renders correctly", () => {
//   const tree = renderer.create(<NavBar code="1234abc" />).toJSON();
//   expect(tree).toMatchSnapshot();
// });
