import { React, useEffect, useState, useRef, useContext } from 'react';
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { SocketContext } from "../../Context/socketContext";

const Chatbox = ({ }) => {
    const scrollRef = useRef(null);
    const [chatMessage, setChatMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on('message_update', (data) => {
            setMessageList((prevList) => [...prevList, data]);        
        });
    }, []);

    // always scroll to bottom of text chat when there are new messages
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behaviour: "smooth" });
        }
    }, [messageList]);

    return (
        <Card >
            <Card.Header title="MessageBoard" />
            <Card.Body >
                <ListGroup>
                    {messageList.map((message, index) => {
                        return (
                            <ListGroup.Item key={index}>{message}</ListGroup.Item>
                        );
                    })}
                    <ListGroup.Item ref={scrollRef} />
                </ListGroup>
            </Card.Body>
            <Card.Footer >
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Send a message"
                        aria-label="Send a message"
                        aria-describedby="basic-addon2"
                        value={chatMessage}
                        onChange={(event) => {
                            setChatMessage(event.target.value);
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && chatMessage) {
                                socket.emit('message', {
                                    username: "test-username",
                                    message: chatMessage
                                });
                                setChatMessage('');
                            }
                        }}
                    />
                    <InputGroup.Append>
                        <Button
                            variant="outline-secondary"
                            onClick={() => {
                                if (chatMessage) {
                                    socket.emit('message', {
                                        username: "test-username",
                                        message: chatMessage    
                                    });
                                    setChatMessage('');
                                }
                            }}>Send</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Card.Footer>
        </Card>
    );
};

export default Chatbox;
