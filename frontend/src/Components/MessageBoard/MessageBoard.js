import { React, useEffect, useState, useRef, useContext } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { SocketContext } from "../../Context/socketContext";
import axios from "axios";
import "../../App.css";

const Chatbox = ({ messageList }) => {
  const scrollRef = useRef(null);
  const [chatMessage, setChatMessage] = useState("");
  const socket = useContext(SocketContext);
  const [username, setUsername] = useState("Anonymous");

  useEffect(() => {
    axios
      .get("/user")
      .then((res) => {
        setUsername(res.data.username);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // always scroll to bottom of text chat when there are new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messageList]);

  return (
    <Card id="Card-field" style={{}}>
      <Card.Header id="Card-Header" title="MessageBoard" />
      <Card.Body style={{ overflowY: "scroll", height: "60vh" }}>
        <ListGroup>
          {messageList.map((message, index) => {
            return (
              <ListGroup.Item
                style={{ backgroundColor: "#BDBDBD", color: "black" }}
                key={index}
              >
                {message}
              </ListGroup.Item>
            );
          })}
          <ListGroup.Item
            style={{ backgroundColor: "#ABABAB", color: "black" }}
            ref={scrollRef}
          />
        </ListGroup>
      </Card.Body>
      <Card.Footer
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
        id="Card-Footer"
      >
        <InputGroup
          style={{
            display: "grid",
            gridTemplateColumns: "7fr 1fr",
            gridAutoFlow: "column",
          }}
        >
          <input
            className="AccountInputField"
            placeholder="Send a message"
            aria-label="Send a message"
            aria-describedby="basic-addon2"
            value={chatMessage}
            style={{
              margin: "0",
              backgroundColor: "#919191",
              borderTopRightRadius: "0",
              borderBottomRightRadius: "0",
              color: "black",
            }}
            onChange={(event) => {
              setChatMessage(event.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter" && chatMessage) {
                socket.emit("message", {
                  username: username,
                  message: chatMessage,
                });
                setChatMessage("");
              }
            }}
          />
          <InputGroup.Append>
            <Button
              className="NavBarButton"
              style={{
                margin: "0",
                color: "white",
                width: "100%",
              }}
              variant="outline-secondary"
              onClick={() => {
                if (chatMessage) {
                  socket.emit("message", {
                    username: username,
                    message: chatMessage,
                  });
                  setChatMessage("");
                }
              }}
            >
              Send
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Card.Footer>
    </Card>
  );
};

export default Chatbox;
