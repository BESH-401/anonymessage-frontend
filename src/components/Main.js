import React, { Component } from "react";
import socketIOClient from "socket.io-client";
const baseUrl =  process.env.REACT_APP_BASE_URL;
const extension = process.env.REACT_APP_EXTENSION
const socket = socketIOClient(`${baseUrl}/${extension}`);

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sender: ["This user has joined", "Tek three has joined"],
      value: "",
      username: "",
      boolean: false,
      fakeObject: [
        { username: "fakeusername", message: "fakeMessage" },
        { username: "fakeusername", message: "fakeMessage" },
        { username: "fakeusername", message: "fakeMessage" },
      ],
    };
  }
  // message and username

  // update state with newobject
  showObject() {
    const newObject = {
      key: { username: "fakeusername", message: "fakeMessage" },
    };
    this.state.fakeObject.push(newObject);
    console.log(this.state.fakeObject);
  }

  componentDidMount() {
    socket.on("messageOut", (sender) => {
      this.state.fakeObject.push(sender);
      this.setState({ sender: sender });
    });

    socket.on("stringOut", (sender) => {
      this.state.sender.push(sender);
    });
  }

  // on submit - socket.emit - username and message
  send(e) {
    e.preventDefault();
    socket.emit("message", this.state.value);
  }

  userName(e) {
    e.preventDefault();
    socket.emit("initialLogin", this.state.username);
    this.setState({ boolean: true });
  }

  render() {
    return (
      <div>
        <div className="main-wrapper">
          <div className="text-wrapper">
            {this.state.fakeObject.map((messages, idx) => (
              <div className="blub-wrapper-one" key={idx}>
                <div className="blub-wrapper-one">
                  <p>
                    {messages.username} {messages.message}
                  </p>
                </div>
              </div>
            ))}

            {this.state.sender.map((messages, idx) => (
              <div className="blub-wrapper-one" key={idx}>
                <div className="blub-wrapper-one">
                  <p>{messages}</p>
                </div>
              </div>
            ))}
          </div>

          {this.state.boolean === false ? (
            <div className="input-wrapper">
              <form className="input">
                <label>
                  <input
                    onChange={(e) =>
                      this.setState({ username: e.target.value })
                    }
                    className="text-input"
                    placeholder="Input User"
                    type="text"
                    name="name"
                  ></input>
                </label>
                <input onClick={(e) => this.userName(e)} type="submit" />
              </form>
            </div>
          ) : (
            <div className="input-wrapper">
              <form className="input">
                <label>
                  <input
                    onChange={(e) => this.setState({ value: e.target.value })}
                    className="text-input"
                    placeholder="text message"
                    type="text"
                    name="name"
                  ></input>
                </label>
                <input onClick={(e) => this.send(e)} type="submit" />
              </form>
              <button onClick={() => this.showObject()}>here</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
