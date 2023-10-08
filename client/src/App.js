import "./App.css";
import io from "socket.io-client";
import axios from "axios";
import { useEffect, useState } from "react";

//Connection
const socket = io("http://localhost:4000");
const url = "http://localhost:4000/api/";

function App() {
  const [nickname, setNickName] = useState("");
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [messages, setMessages] = useState([]);

  const [storedMessages, setStoredMessages] = useState([]);
  const [firstTime, setFirstTime] = useState(false);

  if (!firstTime) {
    axios
      .get(url + "messages")
      .then((res) => setStoredMessages(res.data.messages));
    setFirstTime(true);
  }

  useEffect(() => {
    const recivedMessage = (message) => {
      setMessages([message, ...messages]);
    };

    socket.on("message", recivedMessage);
    return () => {
      socket.off("message", recivedMessage);
    };
  }, [messages]);

  const nicknameSubmit = (e) => {
    e.preventDefault();
    setNickName(nickname);
    setDisabled(true);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (nickname.length) {
      socket.emit("message", message, nickname);

      const newMessage = {
        body: message,
        from: "Me",
      };

      setMessages([newMessage, ...message]);
      setMessage("");
      //Saving Messages
      axios.post(url + "save", {
        message: message,
        from: nickname,
      });
    } else {
      alert("Enter a Nickname");
    }
  };
  return (
    <div className="App">
      <div className="container mt-3">
        <div className="card">
          <div className="card-body">
            <h5 className="text-center">CHAT</h5>

            {/*NickName*/}
            <form onSubmit={nicknameSubmit}>
              <div className="d-flex mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nickname..."
                  id="nickname"
                  onChange={(e) => {
                    setNickName(e.target.value);
                  }}
                  disabled={disabled}
                />
                <button
                  className="btn btn-success mx-3"
                  type="submit"
                  id="btn-nickname"
                  disabled={disabled}
                >
                  Save
                </button>
              </div>
            </form>

            {/*CHAT Form*/}
            <form onSubmit={handlerSubmit}>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Message..."
                  id="message"
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  value={message}
                />
                <button
                  className="btn btn-success mx-3"
                  type="submit"
                  id="btn-message"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
        {/*Chat Message*/}
        <div className="card mt-3 mb-3" id="content-chat">
          <div className="card-body">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`d-flex p-3 ${
                  message.from === "Me"
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <div
                  className={`card mb-3 border-1 ${
                    message.from === "Me"
                      ? "bg-success bg-opacity-25"
                      : "bg-light"
                  }`}
                >
                  <div className="card-body">
                    <small>
                      {message.from}: {message.message}
                    </small>
                  </div>
                </div>
              </div>
            ))}
            {/*Stored Message*/}

            <small className="text-center text-muted">
              ... Stored Messages ...
            </small>

            <div className="card-body">
              {storedMessages.map((message, index) => (
                <div
                  key={index}
                  className={`d-flex p-3 ${
                    message.from === nickname
                      ? "justify-content-end"
                      : "justify-content-start"
                  }`}
                >
                  <div
                    className={`card mb-3 border-1 ${
                      message.from === nickname
                        ? "bg-success bg-opacity-25"
                        : "bg-light"
                    }`}
                  >
                    <div className="card-body">
                      <small className="text-muted">
                        {message.from}: {message.message}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
